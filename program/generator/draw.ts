// markdown-render-speed-01's generator (program/v1, node22): draws one instance from /input/seed.json
// (server/competitions/instance.ts instanceSeedFile: a drand round's seed) and writes it as
//
//   /output/input/cases.json          what an entry reads at /input: a JSON array of {id, markdown}, every
//                                     case of the instance in order
//   /output/reference/expected.json   what the scorer reads at /reference: {format, reference, groups,
//                                     cases}, each case's id, its group and the HTML marked renders for it
//
// The cases:
//   spec      every example of the CommonMark 0.31.2 spec (652) and of the GFM 0.29 spec's extensions (28),
//             as marked's own test suite holds them at v18.1.3 (spec/examples.json, spec/NOTICE), ids
//             cm-001 to cm-652 and gfm-<n> by example number, the same in every instance
//   documents DOCUMENTS READMEs (readme.ts), doc-01 onwards, each drawn from a stream of its own
//             (rng.ts streamFor: the seed, "doc" and its index) to at least DOC_MIN_CHARS to
//             DOC_MAX_CHARS characters; a few spec examples are set between their blocks (insertable:
//             the examples that leave a paragraph after them, and one before them, a paragraph)
//
// The reference is marked itself, vendored byte for byte (vendor/marked/marked.esm.js: marked 18.1.3 from
// npm, MIT, vendor/marked/NOTICE), each case rendered by marked.parse(markdown) alone with the defaults
// (GFM on): whatever marked renders is the expected HTML, the spec's own HTML never. Every group (a spec
// section, or one document) is listed once in `groups`, in order, for the scorer's per-group checks.
//
// Pure: no clock, no network, no environment but the directories (MAKEFUN_INPUT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /input and /output outside a container), so two runs on one seed
// write the same bytes (grader/instance.ts draws twice and compares).

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readme } from './readme.ts';
import { streamFor } from './rng.ts';
import { marked } from './vendor/marked/marked.esm.js';

/** The marked release the reference is: the vendored file's own banner names it, and draw refuses any other. */
export const MARKED_VERSION = '18.1.3';
export const EXPECTED_FORMAT = 'makefun/markdown-render-speed/expected/v1';
/** How many documents an instance holds, and the least and most characters each is drawn to reach. */
export const DOCUMENTS = 40;
export const DOC_MIN_CHARS = 20_000;
export const DOC_MAX_CHARS = 100_000;
/** The paragraph an insertable example must leave intact after it and before it. */
const SENTINEL = 'zq sentinel paragraph';

interface SpecExample {
  id: string;
  spec: string;
  example: number;
  section: string;
  markdown: string;
}

interface Group {
  key: string;
  group: string;
  title: string;
}

const HERE = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function render(markdown: string): string {
  const html = marked.parse(markdown);
  if (typeof html !== 'string') throw new Error('marked.parse returned no string (async is off by default)');
  return html;
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const banner = readFileSync(join(HERE, 'vendor', 'marked', 'marked.esm.js'), 'utf8').slice(0, 200);
if (!banner.includes(` * marked v${MARKED_VERSION} - a markdown parser`)) throw new Error(`vendor/marked/marked.esm.js is not marked v${MARKED_VERSION}`);

const seedFile = JSON.parse(readFileSync(join(INPUT_DIR, 'seed.json'), 'utf8')) as { schema?: unknown; seed?: unknown };
if (seedFile.schema !== 'agent-fun/instance-seed/v1' || typeof seedFile.seed !== 'string' || !/^[0-9a-f]{64}$/.test(seedFile.seed)) {
  throw new Error('/input/seed.json is not an agent-fun/instance-seed/v1 seed');
}
const seed = seedFile.seed;

const examples = JSON.parse(readFileSync(join(HERE, 'spec', 'examples.json'), 'utf8')) as SpecExample[];
const insertable = examples
  .filter((e) => {
    const body = e.markdown.replace(/\n+$/, '');
    if (body.trim() === '') return false;
    const after = render(`${body}\n\n${SENTINEL}\n`);
    const before = render(`${SENTINEL}\n\n${body}\n`);
    return after.endsWith(`<p>${SENTINEL}</p>\n`) && before.startsWith(`<p>${SENTINEL}</p>\n`);
  })
  .map((e) => e.markdown);

const groups: Group[] = [];
const cases: { id: string; markdown: string }[] = [];
const expected: { id: string; group: string; html: string }[] = [];
const seen = new Set<string>();

for (const e of examples) {
  const key = `${e.spec.startsWith('gfm') ? 'gfm' : 'cm'}-${slug(e.section)}`;
  if (!seen.has(key)) {
    seen.add(key);
    groups.push({ key, group: e.spec.startsWith('gfm') ? 'GFM 0.29 spec extensions' : 'CommonMark 0.31.2 spec', title: e.section });
  }
  cases.push({ id: e.id, markdown: e.markdown });
  expected.push({ id: e.id, group: key, html: render(e.markdown) });
}

for (let i = 0; i < DOCUMENTS; i++) {
  const rng = streamFor(seed, 'doc', i);
  const target = rng.between(DOC_MIN_CHARS, DOC_MAX_CHARS);
  const markdown = readme(rng, target, insertable);
  const id = `doc-${String(i + 1).padStart(2, '0')}`;
  groups.push({ key: id, group: 'Generated documents', title: `Document ${i + 1} (${markdown.length} characters)` });
  cases.push({ id, markdown });
  expected.push({ id, group: id, html: render(markdown) });
}

mkdirSync(join(OUTPUT_DIR, 'input'), { recursive: true });
mkdirSync(join(OUTPUT_DIR, 'reference'), { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'input', 'cases.json'), `${JSON.stringify(cases)}\n`);
writeFileSync(join(OUTPUT_DIR, 'reference', 'expected.json'), `${JSON.stringify({ format: EXPECTED_FORMAT, reference: { name: 'marked', version: MARKED_VERSION }, groups, cases: expected })}\n`);
