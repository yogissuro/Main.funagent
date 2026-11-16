// One generated document: a README as open-source projects write them, drawn from an Rng. A title
// (ATX or setext) and a line of badges, a centred logo in raw HTML, an introduction, a table of
// contents, then sections and subsections of paragraphs, nested bullet, ordered and task lists, GFM
// tables with alignments, fenced and indented code, block quotes holding lists and code, raw HTML
// blocks (details/summary with Markdown inside, comments, tables, pre), thematic breaks, link
// reference definitions, and a few CommonMark and GFM spec examples set between the blocks as they
// are. Inline text mixes emphasis and strong emphasis (intraword too), strikethrough, code spans,
// inline, reference and image links, autolinks and GFM's extended ones, entities, backslash escapes,
// inline HTML, hard and soft line breaks, punctuation and non-ASCII words. Some documents use CRLF
// line ends, tabs in their indentation, or no final line end.
//
// Every choice is a draw of the document's own stream, so a document is a pure function of the seed
// and its index. What it renders to is never decided here: the reference is whatever marked renders
// (draw.ts), so a construct this file writes "wrong" is still a case, rendered as marked renders it.

import type { Rng } from './rng.ts';

const WORDS = [
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'from', 'by', 'at', 'as', 'is', 'are', 'be', 'it', 'this',
  'that', 'you', 'your', 'we', 'our', 'can', 'will', 'may', 'should', 'must', 'not', 'no', 'all', 'any', 'each', 'every', 'one', 'two',
  'parser', 'renderer', 'markdown', 'html', 'string', 'option', 'options', 'config', 'file', 'files', 'directory', 'module', 'package',
  'function', 'method', 'class', 'value', 'values', 'type', 'types', 'default', 'returns', 'argument', 'callback', 'promise', 'error',
  'install', 'build', 'run', 'test', 'tests', 'release', 'version', 'support', 'browser', 'server', 'node', 'client', 'request',
  'response', 'cache', 'token', 'tokens', 'lexer', 'inline', 'block', 'list', 'table', 'heading', 'link', 'image', 'code', 'quote',
  'fast', 'small', 'simple', 'safe', 'stable', 'modern', 'lightweight', 'extensible', 'compatible', 'optional', 'required', 'new',
  'old', 'first', 'last', 'next', 'previous', 'better', 'faster', 'slower', 'large', 'empty', 'valid', 'invalid', 'public', 'private',
  'use', 'uses', 'used', 'using', 'add', 'adds', 'remove', 'removes', 'change', 'changes', 'fix', 'fixes', 'update', 'updates',
  'read', 'write', 'parse', 'render', 'escape', 'match', 'call', 'return', 'export', 'import', 'create', 'delete', 'open', 'close',
  'project', 'library', 'tool', 'command', 'line', 'lines', 'output', 'input', 'stream', 'buffer', 'path', 'url', 'data', 'state',
  'example', 'examples', 'docs', 'guide', 'note', 'warning', 'issue', 'issues', 'pull', 'commit', 'branch', 'license', 'author',
  'when', 'then', 'else', 'if', 'but', 'so', 'because', 'only', 'also', 'more', 'less', 'most', 'some', 'many', 'other', 'same',
] as const;

// Symbols and emoji by escape, so the source holds no literal glyph: an arrow, an ellipsis, an em and an en dash, a
// half, the copyright and trade mark signs, two emoji (each a surrogate pair) and the fi ligature.
const UNICODE_WORDS = ['café', 'naïve', 'über', 'façade', 'déjà', 'Ελληνικά', 'русский', '日本語', '中文', '한국어', 'ünïcödé', '\u2192', '\u2026', '\u2014', '\u2013', '\u00bd', '\u00a9', '\u2122', '\u{1F600}', '\u{1F680}', 'ÅÄÖ', 'ß', '\ufb01'] as const;

const IDENTS = ['parseInline', 'renderer.code', 'max_width', 'MAX_DEPTH', '__init__', 'useState', 'onChange', 'my-package', 'src/index.ts', 'lib/main.js', 'tsconfig.json', 'README.md', 'v2.1.0', 'npm', 'npx', 'pnpm', 'yarn', 'git', 'node', 'deno', 'bun', 'x86_64', 'utf-8', 'i18n', 'foo_bar_baz', 'a_b', 'snake_case'] as const;

const NAMES = ['widget', 'flux', 'tiny', 'mark', 'down', 'glyph', 'quill', 'ember', 'nova', 'pixel', 'vapor', 'orbit', 'prism', 'cinder', 'atlas', 'echo', 'fable', 'grain', 'hatch', 'ivory', 'jolt', 'kite', 'lumen', 'moss', 'nimbus', 'oak', 'pulse', 'quartz', 'relay', 'sprout'] as const;

const DOMAINS = ['example.com', 'example.org', 'docs.example.dev', 'github.com', 'npmjs.com', 'img.shields.io', 'cdn.example.net', 'www.example.com', 'sub.domain.example.io'] as const;

const LANGS = ['js', 'javascript', 'ts', 'typescript', 'json', 'sh', 'bash', 'console', 'shell', 'python', 'py', 'diff', 'yaml', 'toml', 'html', 'css', 'rust', 'go', 'md', 'markdown', 'text', 'jsx', 'c++', 'objective-c', '', ''] as const;

const ENTITIES = ['&amp;', '&lt;', '&gt;', '&quot;', '&copy;', '&reg;', '&nbsp;', '&mdash;', '&hellip;', '&#169;', '&#xA9;', '&#x1F600;', '&#0;', '&#123;', '&notanentity;', '&', 'AT&T', '&amp ;', '& b'] as const;

const ESCAPES = ['\\*', '\\_', '\\#', '\\[', '\\]', '\\\\', '\\`', '\\<', '\\>', '\\!', '\\|', '\\~', '\\.', '\\-', '\\+', '\\(', '\\)', '\\a', '\\é'] as const;

const INLINE_HTML = ['<kbd>Ctrl</kbd>+<kbd>C</kbd>', '<sup>1</sup>', '<sub>2</sub>', '<span class="badge">new</span>', '<br>', '<br/>', '<!-- note -->', '<abbr title="HyperText Markup Language">HTML</abbr>', '<code>x &lt; y</code>', '<a href="#top">top</a>', '<img src="x.png" alt="x">', '<b>bold</b>', '<em>em</em>', '<ins>ins</ins>', '<del>del</del>', '<span>', '</span>', '<x-custom attr=\'1\'>'] as const;

const PUNCT = [',', '.', ';', ':', '!', '?', ' -', ' --', '...'] as const;

/** A label a document defines with a link reference definition, and the destination it names. */
interface RefDef {
  label: string;
  url: string;
  title: string | null;
}

/** What one document draws from as it writes: its stream, its link labels, its anchors, the spec examples it may set between blocks. */
export interface DocContext {
  rng: Rng;
  refs: RefDef[];
  anchors: string[];
  inserts: readonly string[];
}

function word(rng: Rng): string {
  return rng.pick(WORDS);
}

function words(rng: Rng, lo: number, hi: number): string {
  const n = rng.between(lo, hi);
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(word(rng));
  return out.join(' ');
}

function capital(s: string): string {
  return s.length === 0 ? s : s[0]!.toUpperCase() + s.slice(1);
}

function url(rng: Rng): string {
  const scheme = rng.weighted([
    [8, 'https://'],
    [1, 'http://'],
  ] as const);
  const path = rng.chance(2, 3) ? `/${word(rng)}${rng.chance(1, 2) ? `/${rng.pick(NAMES)}` : ''}` : '';
  const query = rng.chance(1, 6) ? `?q=${word(rng)}&page=${rng.between(1, 9)}` : '';
  const frag = rng.chance(1, 8) ? `#${word(rng)}-${word(rng)}` : '';
  return `${scheme}${rng.pick(DOMAINS)}${path}${query}${frag}`;
}

function title(rng: Rng): string {
  return rng.choose([
    [3, () => ` "${capital(words(rng, 1, 4))}"`],
    [1, () => ` '${capital(words(rng, 1, 3))}'`],
    [1, () => ` (${capital(words(rng, 1, 3))})`],
  ]);
}

/** A short run of words that may hold one nested inline construct, for inside emphasis and link text. */
function phrase(ctx: DocContext, depth: number): string {
  const { rng } = ctx;
  const parts = [words(rng, 1, 3)];
  if (depth < 2 && rng.chance(1, 4)) parts.push(atom(ctx, depth + 1));
  if (rng.chance(1, 3)) parts.push(words(rng, 1, 2));
  return parts.join(' ');
}

/** One inline construct (the header's list), at nesting `depth`. */
function atom(ctx: DocContext, depth: number): string {
  const { rng } = ctx;
  const kind = rng.weighted([
    [10, 'em'],
    [8, 'strong'],
    [2, 'strongem'],
    [3, 'strike'],
    [10, 'code'],
    [8, 'link'],
    [3, 'image'],
    [5, 'ref'],
    [3, 'autolink'],
    [4, 'gfmlink'],
    [3, 'entity'],
    [3, 'escape'],
    [4, 'html'],
    [4, 'intraword'],
    [4, 'unicode'],
    [4, 'ident'],
  ] as const);
  switch (kind) {
    case 'em': {
      const m = rng.pick(['*', '_'] as const);
      return `${m}${phrase(ctx, depth)}${m}`;
    }
    case 'strong': {
      const m = rng.pick(['**', '__'] as const);
      return `${m}${phrase(ctx, depth)}${m}`;
    }
    case 'strongem':
      return rng.choose([
        [1, () => `***${words(rng, 1, 3)}***`],
        [1, () => `**${words(rng, 1, 2)} *${words(rng, 1, 2)}***`],
        [1, () => `*${words(rng, 1, 2)} **${words(rng, 1, 2)}***`],
        [1, () => `_${words(rng, 1, 2)} __${words(rng, 1, 2)}___`],
      ]);
    case 'strike':
      return rng.chance(3, 4) ? `~~${phrase(ctx, depth)}~~` : `~${words(rng, 1, 2)}~`;
    case 'code':
      return rng.choose([
        [6, () => `\`${rng.pick(IDENTS)}\``],
        [2, () => `\`${rng.pick(IDENTS)}(${rng.chance(1, 2) ? rng.pick(IDENTS) : ''})\``],
        [2, () => `\`<${word(rng)}> && x < 1\``],
        [1, () => '`` a ` b ``'],
        [1, () => `\` ${word(rng)} \``],
        [1, () => `\`\`${word(rng)}\``],
        [1, () => '`*not emphasis*`'],
      ]);
    case 'link': {
      const text = depth < 2 && rng.chance(1, 5) ? `\`${rng.pick(IDENTS)}\`` : phrase(ctx, depth);
      const dest = rng.choose([
        [6, () => url(rng)],
        [2, () => `#${rng.chance(1, 2) && ctx.anchors.length > 0 ? rng.pick(ctx.anchors) : word(rng)}`],
        [1, () => `<${url(rng)}/${word(rng)} ${word(rng)}>`],
        [1, () => `./docs/${word(rng)}.md`],
        [1, () => `${url(rng)}/(${word(rng)})`],
      ]);
      return `[${text}](${dest}${rng.chance(1, 4) ? title(rng) : ''})`;
    }
    case 'image':
      return `![${words(rng, 1, 3)}](${url(rng)}.${rng.pick(['png', 'svg', 'gif'] as const)}${rng.chance(1, 3) ? title(rng) : ''})`;
    case 'ref': {
      if (ctx.refs.length === 0 || rng.chance(1, 10)) return `[${word(rng)} ${word(rng)}]`;
      const r = rng.pick(ctx.refs);
      return rng.choose([
        [4, () => `[${phrase(ctx, depth)}][${r.label}]`],
        [2, () => `[${r.label}][]`],
        [2, () => `[${r.label}]`],
        [1, () => `[${r.label.toUpperCase()}]`],
        [1, () => `![${words(rng, 1, 2)}][${r.label}]`],
      ]);
    }
    case 'autolink':
      return rng.choose([
        [3, () => `<${url(rng)}>`],
        [1, () => `<mailto:${word(rng)}@${rng.pick(DOMAINS)}>`],
        [1, () => `<${word(rng)}.${word(rng)}@${rng.pick(DOMAINS)}>`],
      ]);
    case 'gfmlink':
      return rng.choose([
        [3, () => url(rng)],
        [2, () => `www.${rng.pick(NAMES)}.com${rng.chance(1, 2) ? `/${word(rng)}` : ''}`],
        [1, () => `${word(rng)}@${rng.pick(NAMES)}.example.com`],
        [1, () => `(${url(rng)})`],
        [1, () => `${url(rng)}.`],
        [1, () => `<${url(rng)}>.`],
      ]);
    case 'entity':
      return rng.pick(ENTITIES);
    case 'escape':
      return `${rng.pick(ESCAPES)}${rng.chance(1, 2) ? word(rng) : ''}`;
    case 'html':
      return rng.pick(INLINE_HTML);
    case 'intraword':
      return rng.choose([
        [1, () => `${word(rng)}_${word(rng)}_${word(rng)}`],
        [1, () => '2*3*4'],
        [1, () => `${word(rng)}**${word(rng)}**${word(rng)}`],
        [1, () => `${word(rng)}*${word(rng)}*`],
        [1, () => 'a * b * c'],
        [1, () => '__init__'],
        [1, () => 'x_1 + y_2'],
        [1, () => '5 * 3 = 15'],
        [1, () => `**${word(rng)}**${word(rng)}`],
        [1, () => `*${word(rng)}*${word(rng)}*`],
      ]);
    case 'unicode':
      return rng.pick(UNICODE_WORDS);
    case 'ident':
      return rng.pick(IDENTS);
  }
}

/** One line of inline text, no line end: 4 to 18 slots, each a word or (one in four) an inline construct, with punctuation. */
function inlineLine(ctx: DocContext): string {
  const { rng } = ctx;
  const n = rng.between(4, 18);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    let s = rng.chance(1, 4) ? atom(ctx, 0) : word(rng);
    if (i === 0) s = capital(s);
    if (rng.chance(1, 9)) s += rng.pick(PUNCT);
    out.push(s);
  }
  let line = out.join(rng.chance(1, 20) ? '  ' : ' ');
  line += rng.pick(['.', '.', '.', '!', '?', ':', '', '.)'] as const);
  return line;
}

/** A paragraph: 1 to 5 lines, joined by soft breaks and now and then a hard one (two spaces or a backslash). */
function paragraph(ctx: DocContext): string[] {
  const { rng } = ctx;
  const n = rng.between(1, 5);
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    let line = inlineLine(ctx);
    if (i < n - 1) {
      const brk = rng.weighted([
        [12, ''],
        [2, '  '],
        [1, '\\'],
        [1, '   '],
      ] as const);
      line += brk;
    }
    lines.push(line);
  }
  return lines;
}

function headingText(ctx: DocContext): string {
  const { rng } = ctx;
  const parts = [capital(words(rng, 1, 4))];
  if (rng.chance(1, 4)) parts.push(atom(ctx, 1));
  if (rng.chance(1, 6)) parts.push(rng.pick(UNICODE_WORDS));
  return parts.join(' ');
}

function anchorOf(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/ +/g, '-');
}

function heading(ctx: DocContext, level: number): string[] {
  const { rng } = ctx;
  const text = headingText(ctx);
  ctx.anchors.push(anchorOf(text));
  if (level <= 2 && rng.chance(1, 5)) return [text, (level === 1 ? '=' : '-').repeat(rng.between(1, text.length + 4))];
  const lead = rng.chance(1, 12) ? ' '.repeat(rng.between(1, 3)) : '';
  const close = rng.chance(1, 8) ? ` ${'#'.repeat(rng.between(1, 6))}` : '';
  return [`${lead}${'#'.repeat(level)} ${text}${close}`];
}

const FENCE_BODY = [
  'const x = require("x");',
  "import { parse } from './parse.js';",
  'function f(a, b) {',
  '  return a < b && b > 0 ? a : "<b>";',
  '}',
  'npm install --save my-package',
  '$ git clone https://github.com/acme/widget.git',
  'if (x) { y = x & 0xff; }',
  'print("hello, world")',
  '- not a list item',
  '# not a heading',
  '> not a quote',
  '| not | a | table |',
  '<div class="x">&amp; &lt;</div>',
  '    indented four',
  '\tindented with a tab',
  '```inner backticks```',
  '*not* **emphasis**',
  '',
  'fn main() -> Result<(), Box<dyn Error>> {',
  '  "key": "value", "n": 1',
  '@@ -1,3 +1,4 @@',
  '+added line',
  '-removed line',
] as const;

function fence(ctx: DocContext): string[] {
  const { rng } = ctx;
  const ch = rng.chance(5, 6) ? '`' : '~';
  const len = rng.weighted([
    [8, 3],
    [1, 4],
    [1, 5],
  ] as const);
  const marker = ch.repeat(len);
  const info = rng.pick(LANGS);
  const extra = info !== '' && rng.chance(1, 6) ? ` {${word(rng)}=${rng.between(1, 9)}}` : '';
  const lines = [`${marker}${info}${extra}`];
  const n = rng.between(1, 14);
  for (let i = 0; i < n; i++) lines.push(rng.chance(3, 4) ? rng.pick(FENCE_BODY) : `${word(rng)} ${rng.pick(IDENTS)} ${word(rng)}`);
  lines.push(rng.chance(1, 10) ? `${marker}${ch}` : marker);
  return lines;
}

function indentedCode(ctx: DocContext): string[] {
  const { rng } = ctx;
  const n = rng.between(1, 8);
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const body = rng.pick(FENCE_BODY);
    lines.push(body === '' ? '' : `${rng.chance(1, 8) ? '\t' : '    '}${body}`);
  }
  if (lines[0] === '') lines[0] = '    x';
  if (lines[lines.length - 1] === '') lines[lines.length - 1] = '    y';
  return lines;
}

function hr(ctx: DocContext): string[] {
  return [ctx.rng.pick(['---', '***', '___', '- - -', '* * *', '_____', ' ---', '--- '] as const)];
}

/** A list (bullet, ordered or tasks) at nesting `depth`, each item one or more blocks, tight or loose. */
function list(ctx: DocContext, depth: number): string[] {
  const { rng } = ctx;
  const ordered = rng.chance(2, 5);
  const tasks = !ordered && rng.chance(1, 4);
  const bullet = rng.pick(['-', '*', '+'] as const);
  const delim = rng.chance(4, 5) ? '.' : ')';
  let num = rng.choose([
    [6, () => 1],
    [1, () => 0],
    [1, () => rng.between(2, 99)],
    [1, () => rng.between(100, 999999)],
  ]);
  const loose = rng.chance(1, 4);
  const n = rng.between(2, depth === 0 ? 8 : 5);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const marker = ordered ? `${num}${delim}` : bullet;
    num += 1;
    const pad = rng.chance(1, 12) ? '  ' : ' ';
    const head = `${marker}${pad}`;
    const indent = ' '.repeat(head.length);
    const blocks: string[][] = [];
    const first = rng.chance(1, 2) ? [inlineLine(ctx)] : paragraph(ctx);
    if (tasks) first[0] = `[${rng.pick([' ', 'x', 'X'] as const)}] ${first[0]}`;
    blocks.push(first);
    if (depth < 3 && rng.chance(1, 4)) blocks.push(list(ctx, depth + 1));
    if (rng.chance(1, 10)) blocks.push(fence(ctx));
    if (loose && rng.chance(1, 3)) blocks.push(paragraph(ctx));
    if (rng.chance(1, 20)) blocks.push(blockquote(ctx, 2));
    const lines: string[] = [];
    blocks.forEach((b, bi) => {
      // A nested list may follow its item's first line directly (tight) or after a blank line.
      if (bi > 0 && (loose || b !== blocks[1] || rng.chance(1, 2) || !isListLines(b))) lines.push('');
      lines.push(...b);
    });
    lines.forEach((l, li) => {
      if (li === 0) out.push(`${head}${l}`);
      else if (l === '') out.push('');
      else out.push(rng.chance(1, 40) && depth === 0 && /^[A-Za-z]/.test(l) ? l : `${indent}${l}`);
    });
    if (loose && i < n - 1) out.push('');
  }
  return out;
}

function isListLines(lines: readonly string[]): boolean {
  return lines.length > 0 && /^(?:[-*+]|\d{1,9}[.)])\s/.test(lines[0]!);
}

/** A block quote of paragraphs, a list or code, sometimes nested, sometimes with a lazy continuation line. */
function blockquote(ctx: DocContext, depth: number): string[] {
  const { rng } = ctx;
  const inner: string[][] = [];
  const n = rng.between(1, 3);
  for (let i = 0; i < n; i++) {
    inner.push(
      rng.choose([
        [5, () => paragraph(ctx)],
        [2, () => (depth < 2 ? list(ctx, 2) : paragraph(ctx))],
        [1, () => fence(ctx)],
        [1, () => (depth < 2 ? blockquote(ctx, depth + 1) : paragraph(ctx))],
        [1, () => [rng.pick(['**Note**', '[!NOTE]', '[!WARNING]', '**Warning:**'] as const), inlineLine(ctx)]],
      ]),
    );
  }
  const lines: string[] = [];
  inner.forEach((b, i) => {
    if (i > 0) lines.push('');
    lines.push(...b);
  });
  const prefix = rng.chance(1, 8) ? '>' : '> ';
  return lines.map((l, i) => {
    if (l === '') return '>';
    // A lazy continuation: a paragraph's later line without its marker.
    if (i > 0 && lines[i - 1] !== '' && /^[A-Za-z]/.test(l) && rng.chance(1, 15)) return l;
    return `${prefix}${l}`;
  });
}

/** A GFM table: 2 to 6 columns with alignments, 1 to 12 rows of inline cells, an escaped pipe now and then. */
function table(ctx: DocContext): string[] {
  const { rng } = ctx;
  const cols = rng.between(2, 6);
  const edge = rng.chance(4, 5);
  const row = (cells: string[]) => (edge ? `| ${cells.join(' | ')} |` : cells.join(' | '));
  const cell = () =>
    rng.choose([
      [6, () => words(rng, 1, 3)],
      [3, () => atom(ctx, 1)],
      [1, () => ''],
      [1, () => '`a \\| b`'],
      [1, () => `${word(rng)} \\| ${word(rng)}`],
      [1, () => rng.pick(UNICODE_WORDS)],
      [1, () => `${rng.between(0, 9999)}`],
    ]);
  const head: string[] = [];
  for (let c = 0; c < cols; c++) head.push(capital(words(rng, 1, 2)));
  const align: string[] = [];
  for (let c = 0; c < cols; c++) {
    const dashes = '-'.repeat(rng.between(1, 6));
    align.push(rng.pick([dashes, `:${dashes}`, `${dashes}:`, `:${dashes}:`]));
  }
  const lines = [row(head), edge ? `|${align.join('|')}|` : align.join(' | ')];
  const n = rng.between(1, 12);
  for (let r = 0; r < n; r++) {
    const width = rng.chance(1, 10) ? rng.between(1, cols + 1) : cols;
    const cells: string[] = [];
    for (let c = 0; c < width; c++) cells.push(cell());
    lines.push(row(cells));
  }
  return lines;
}

function htmlBlock(ctx: DocContext): string[] {
  const { rng } = ctx;
  const kind = rng.weighted([
    [3, 'center'],
    [3, 'details'],
    [2, 'comment'],
    [1, 'table'],
    [1, 'pre'],
    [1, 'br'],
    [1, 'style'],
    [1, 'picture'],
  ] as const);
  switch (kind) {
    case 'center':
      return [
        `<${rng.pick(['div', 'p'] as const)} align="center">`,
        `  <a href="${url(rng)}"><img src="${url(rng)}.svg" alt="${word(rng)}" width="${rng.between(16, 400)}"></a>`,
        ...(rng.chance(1, 2) ? [`  <br>`, `  <b>${words(rng, 1, 4)}</b>`] : []),
        `</${rng.pick(['div', 'p'] as const)}>`,
      ];
    case 'details': {
      const inner = rng.chance(1, 2) ? paragraph(ctx) : list(ctx, 1);
      return ['<details>', `<summary>${capital(words(rng, 1, 4))}</summary>`, '', ...inner, '', '</details>'];
    }
    case 'comment':
      return rng.chance(1, 2) ? [`<!-- ${words(rng, 2, 6)} -->`] : ['<!--', words(rng, 2, 8), '', `  ${words(rng, 1, 4)}`, '-->'];
    case 'table':
      return ['<table>', '  <tr>', `    <td>${words(rng, 1, 3)}</td>`, `    <td>*${word(rng)}*</td>`, '  </tr>', '</table>'];
    case 'pre':
      return ['<pre>', `${rng.pick(FENCE_BODY)}`, '', `**${word(rng)}** &lt; ${word(rng)}`, '</pre>'];
    case 'br':
      return [rng.pick(['<br>', '<br/>', '<hr>', '<hr />'] as const)];
    case 'style':
      return ['<style>', `  .${word(rng)} { color: red; }`, '', `  p > a { margin: ${rng.between(0, 9)}px; }`, '</style>'];
    case 'picture':
      return ['<picture>', `  <source media="(prefers-color-scheme: dark)" srcset="${url(rng)}.png">`, `  <img alt="${word(rng)}" src="${url(rng)}.png">`, '</picture>'];
  }
}

function refDefs(ctx: DocContext, count: number): string[] {
  const { rng } = ctx;
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const r = ctx.refs[rng.below(ctx.refs.length)]!;
    const dest = rng.chance(1, 8) ? `<${r.url}>` : r.url;
    const t = r.title === null ? '' : rng.chance(1, 6) ? `\n  ${r.title}` : ` ${r.title}`;
    out.push(`${rng.chance(1, 10) ? ' ' : ''}[${rng.chance(1, 6) ? r.label.toUpperCase() : r.label}]: ${dest}${t}`);
  }
  return out;
}

function badges(ctx: DocContext, name: string): string[] {
  const { rng } = ctx;
  const n = rng.between(1, 6);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const what = rng.pick(['build', 'npm', 'license', 'coverage', 'downloads', 'size', 'discord'] as const);
    out.push(`[![${what}](https://img.shields.io/badge/${what}-${rng.choose([
        [1, () => 'passing'],
        [1, () => 'MIT'],
        [1, () => `v${rng.between(0, 9)}.${rng.between(0, 20)}.${rng.between(0, 9)}`],
        [1, () => '98%'],
      ])}-${rng.pick(['green', 'blue', 'orange'] as const)}.svg)](https://github.com/acme/${name}${rng.chance(1, 2) ? '/actions' : ''})`);
  }
  return [out.join(rng.chance(1, 2) ? ' ' : '\n')];
}

/** One section's body: 2 to 9 blocks, a subsection now and then. */
function sectionBody(ctx: DocContext, level: number): string[][] {
  const { rng } = ctx;
  const out: string[][] = [];
  const n = rng.between(2, 9);
  for (let i = 0; i < n; i++) {
    const kind = rng.weighted([
      [10, 'p'],
      [5, 'list'],
      [4, 'fence'],
      [1, 'indented'],
      [2, 'quote'],
      [3, 'table'],
      [2, 'html'],
      [1, 'hr'],
      [2, 'insert'],
      [2, 'sub'],
    ] as const);
    switch (kind) {
      case 'p':
        out.push(paragraph(ctx));
        break;
      case 'list':
        out.push(list(ctx, 0));
        break;
      case 'fence':
        out.push(fence(ctx));
        break;
      case 'indented':
        out.push(indentedCode(ctx));
        break;
      case 'quote':
        out.push(blockquote(ctx, 1));
        break;
      case 'table':
        out.push(table(ctx));
        break;
      case 'html':
        out.push(htmlBlock(ctx));
        break;
      case 'hr':
        out.push(hr(ctx));
        break;
      case 'insert':
        if (ctx.inserts.length > 0) out.push(rng.pick(ctx.inserts).replace(/\n+$/, '').split('\n'));
        break;
      case 'sub':
        if (level < 4) {
          out.push(heading(ctx, level + 1));
          out.push(...sectionBody(ctx, level + 1));
        }
        break;
    }
  }
  return out;
}

/** The labels a document defines: 3 to 12, some differing only in case or inner spaces from the way they are used. */
function drawRefs(rng: Rng): RefDef[] {
  const n = rng.between(3, 12);
  const out: RefDef[] = [];
  const seen = new Set<string>();
  while (out.length < n) {
    const label = rng.chance(1, 3) ? `${word(rng)} ${word(rng)}` : rng.chance(1, 2) ? `${word(rng)}-${rng.between(1, 99)}` : `${rng.between(1, 30)}`;
    if (seen.has(label)) continue;
    seen.add(label);
    out.push({ label, url: url(rng), title: rng.chance(1, 3) ? title(rng).trim() : null });
  }
  return out;
}

/** The document's text: at least `target` UTF-16 code units of Markdown, in the shape the header describes. */
export function readme(rng: Rng, target: number, inserts: readonly string[]): string {
  const ctx: DocContext = { rng, refs: drawRefs(rng), anchors: [], inserts };
  const name = `${rng.pick(NAMES)}${rng.chance(1, 2) ? `-${rng.pick(NAMES)}` : ''}`;
  const blocks: string[][] = [];
  blocks.push(rng.chance(1, 4) ? [name, '='.repeat(rng.between(3, name.length + 3))] : [`# ${name}`]);
  blocks.push(badges(ctx, name));
  if (rng.chance(1, 2)) blocks.push(htmlBlock(ctx));
  blocks.push(paragraph(ctx));
  const sections: string[] = [];
  const sectionCount = 4 + rng.below(6);
  for (let i = 0; i < sectionCount; i++) sections.push(capital(words(rng, 1, 3)));
  if (rng.chance(3, 4)) {
    blocks.push([`## ${rng.pick(['Table of Contents', 'Contents', 'Table of contents'] as const)}`]);
    blocks.push(sections.map((s, i) => `${rng.chance(1, 5) ? '  ' : ''}- [${s}](#${anchorOf(s)}${i})`));
  }
  let size = 0;
  for (const b of blocks) size += b.join('\n').length + 2;
  let s = 0;
  while (size < target) {
    const head = s < sections.length ? [`## ${sections[s]}`] : heading(ctx, 2);
    s += 1;
    const body = sectionBody(ctx, 2);
    for (const b of [head, ...body]) {
      blocks.push(b);
      size += b.join('\n').length + 2;
    }
    if (rng.chance(1, 6)) {
      const defs = refDefs(ctx, rng.between(1, 3));
      blocks.push(defs);
      size += defs.join('\n').length + 2;
    }
  }
  blocks.push([`## ${rng.pick(['License', 'Licence', 'LICENSE'] as const)}`]);
  blocks.push([`${rng.pick(['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC'] as const)} © ${rng.between(2009, 2026)} ${capital(word(rng))} ${capital(rng.pick(NAMES))}`]);
  blocks.push(refDefs(ctx, ctx.refs.length));
  // Blocks are set apart by one blank line, now and then by two or by a line of spaces.
  const sep = () =>
    rng.weighted([
      [20, '\n\n'],
      [2, '\n\n\n'],
      [1, '\n   \n'],
      [1, '\n\t\n'],
    ] as const);
  let text = blocks[0]!.join('\n');
  for (let i = 1; i < blocks.length; i++) text += sep() + blocks[i]!.join('\n');
  const end = rng.weighted([
    [8, '\n'],
    [1, ''],
    [1, '\n\n'],
  ] as const);
  text += end;
  if (rng.chance(1, 10)) text = text.replace(/\n/g, '\r\n');
  if (rng.chance(1, 12)) text = text.replace(/^ {4}/gm, '\t');
  return text;
}
