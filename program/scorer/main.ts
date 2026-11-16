// markdown-render-speed-01's scorer (program/v1, node22). It runs after the entry, in a container of its
// own: the entry's outputs read-only at /output, the instance's reference read-only at /reference
// (expected.json, generator/draw.ts writes it: every case's id, group and the HTML marked 18.1.3 renders
// for it), and /scores writable.
//
// The entry's answer is /output/html.json, a regular file (never through a link) holding a JSON array
// of strings, one per case of /input/cases.json and in its order. Each case passes when its string is
// the expected HTML exactly, code unit for code unit (JSON's escapes are read, so "\u003c" and "<" are
// the same character; the bytes of the file itself are not compared). No file, a file that is not
// JSON, or a value that is not an array of as many entries as there are cases passes no case. Nothing
// is normalized: not whitespace, not line ends, not entities, not attribute order.
//
// It writes
//   /scores/scores.json  {passed, cases_passed, cases_total}: passed 1 when every case passes, else 0
//                        (the gate: harness.gate, which the timing heat runs behind), and the counts
//   /scores/checks.json  one row per group of expected.json's `groups`, in order (a spec section, or one
//                        generated document): points its cases, earned those that pass, pass when all
//                        do, and when some fail the detail names the first of them, where its HTML first
//                        differs from marked's, and how many more failed. It never quotes the reference.
//
// A reference that does not read (expected.json missing, not JSON or not in its format) is the
// instance's fault: the scorer exits 1 and the grade is a scorer fault, never the entry's. Outside a
// container MAKEFUN_OUTPUT_DIR, MAKEFUN_REFERENCE_DIR and MAKEFUN_SCORES_DIR stand in for the mounts.

import { lstatSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const REFERENCE_DIR = process.env.MAKEFUN_REFERENCE_DIR ?? '/reference';
const SCORES_DIR = process.env.MAKEFUN_SCORES_DIR ?? '/scores';

const EXPECTED_FORMAT = 'makefun/markdown-render-speed/expected/v1';
/** The entry's answer file under /output. */
const ANSWER_FILE = 'html.json';
/** The most failing case ids one check's detail names before it counts the rest. */
const NAMED = 5;

interface Group {
  key: string;
  group: string;
  title: string;
}

interface ExpectedCase {
  id: string;
  group: string;
  html: string;
}

interface Expected {
  format: string;
  groups: Group[];
  cases: ExpectedCase[];
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

/** /reference/expected.json, held to its shape: anything else is the instance's fault (thrown: exit 1). */
function readExpected(): Expected {
  const file = join(REFERENCE_DIR, 'expected.json');
  if (!lstatSync(file).isFile()) throw new Error('the reference expected.json is not a regular file');
  const v = JSON.parse(readFileSync(file, 'utf8')) as Partial<Expected>;
  if (v.format !== EXPECTED_FORMAT) throw new Error(`the reference expected.json is not ${EXPECTED_FORMAT}`);
  if (!Array.isArray(v.groups) || !Array.isArray(v.cases) || v.cases.length === 0) throw new Error('the reference expected.json lists no groups or no cases');
  const keys = new Set<string>();
  for (const g of v.groups) {
    if (!isString(g.key) || !isString(g.group) || !isString(g.title) || keys.has(g.key)) throw new Error('the reference expected.json holds a malformed or repeated group');
    keys.add(g.key);
  }
  for (const c of v.cases) {
    if (!isString(c.id) || !isString(c.html) || !keys.has(c.group)) throw new Error('the reference expected.json holds a malformed case');
  }
  return v as Expected;
}

/** The entry's answers, or why it has none. */
function readAnswers(count: number): { answers: unknown[] } | { why: string } {
  const file = join(OUTPUT_DIR, ANSWER_FILE);
  let isFile = false;
  try {
    isFile = lstatSync(file).isFile();
  } catch {
    return { why: `the entry wrote no /output/${ANSWER_FILE}` };
  }
  if (!isFile) return { why: `/output/${ANSWER_FILE} is not a regular file` };
  let v: unknown;
  try {
    v = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return { why: `/output/${ANSWER_FILE} is not JSON` };
  }
  if (!Array.isArray(v)) return { why: `/output/${ANSWER_FILE} is not a JSON array` };
  if (v.length !== count) return { why: `/output/${ANSWER_FILE} holds ${v.length} entries for ${count} cases` };
  return { answers: v };
}

/** Where `got` first differs from `want`: the first code unit that differs, or the shorter one's end. */
function firstDifference(got: string, want: string): number {
  const n = Math.min(got.length, want.length);
  for (let i = 0; i < n; i++) if (got.charCodeAt(i) !== want.charCodeAt(i)) return i;
  return n;
}

const expected = readExpected();
const read = readAnswers(expected.cases.length);
/** Each case's verdict: null when it passes, else why it does not. */
const verdicts: (string | null)[] = expected.cases.map((c, i) => {
  if ('why' in read) return read.why;
  const got = read.answers[i];
  if (!isString(got)) return `entry ${i} of /output/${ANSWER_FILE} is not a string`;
  if (got === c.html) return null;
  const at = firstDifference(got, c.html);
  return `its HTML first differs from marked's at character ${at} (${got.length} characters written, ${c.html.length} expected)`;
});

const passedCount = verdicts.filter((v) => v === null).length;
const scores = { passed: passedCount === expected.cases.length ? 1 : 0, cases_passed: passedCount, cases_total: expected.cases.length };

const checks = expected.groups.map((g) => {
  const idx: number[] = [];
  expected.cases.forEach((c, i) => {
    if (c.group === g.key) idx.push(i);
  });
  const failed = idx.filter((i) => verdicts[i] !== null);
  const row: { key: string; group: string; title: string; points: number; earned: number; pass: boolean; detail?: string } = {
    key: g.key,
    group: g.group,
    title: g.title,
    points: idx.length,
    earned: idx.length - failed.length,
    pass: failed.length === 0,
  };
  if (failed.length > 0) {
    const first = failed[0]!;
    const others = failed.slice(1, NAMED).map((i) => expected.cases[i]!.id);
    const more = failed.length - 1 - others.length;
    const also = others.length === 0 ? '' : `; also ${others.join(', ')}${more > 0 ? ` and ${more} more` : ''}`;
    row.detail = `${expected.cases[first]!.id}: ${verdicts[first]}${also}`.slice(0, 2000);
  }
  return row;
});

mkdirSync(SCORES_DIR, { recursive: true });
writeFileSync(join(SCORES_DIR, 'scores.json'), `${JSON.stringify(scores)}\n`);
writeFileSync(join(SCORES_DIR, 'checks.json'), `${JSON.stringify(checks)}\n`);
