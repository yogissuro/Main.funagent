// The generator's random stream: xoshiro128** (Blackman and Vigna) over 32-bit integers, seeded from
// sha256 of a domain string and the instance seed, so every draw is a pure function of the seed and
// reads the same on every JavaScript engine (Math.imul and 32-bit shifts only: no floating point, no
// Math.random). Each document draws from a stream of its own (streamFor: the seed and the document's
// index), so one document's draws never move another's.

import { createHash } from 'node:crypto';

/** The domain every stream's sha256 starts with. */
export const RNG_DOMAIN = 'makefun/markdown-render-speed-01/rng/v1';

function rotl(x: number, k: number): number {
  return (x << k) | (x >>> (32 - k));
}

export class Rng {
  #a: number;
  #b: number;
  #c: number;
  #d: number;

  /** Seeded from the first 16 bytes of `key` (a sha256), big-endian; an all-zero state is refused. */
  constructor(key: Uint8Array) {
    if (key.length < 16) throw new RangeError('an Rng key holds at least 16 bytes');
    const v = new DataView(key.buffer, key.byteOffset, 16);
    this.#a = v.getUint32(0) | 0;
    this.#b = v.getUint32(4) | 0;
    this.#c = v.getUint32(8) | 0;
    this.#d = v.getUint32(12) | 0;
    if ((this.#a | this.#b | this.#c | this.#d) === 0) throw new RangeError('an all-zero xoshiro128** state never moves');
  }

  /** The next 32-bit draw, 0 to 2^32 - 1. */
  u32(): number {
    const a = this.#a;
    const b = this.#b;
    const result = Math.imul(rotl(Math.imul(b, 5), 7), 9) >>> 0;
    const t = b << 9;
    let c = this.#c ^ a;
    let d = this.#d ^ b;
    this.#b = b ^ c;
    this.#a = a ^ d;
    c ^= t;
    d = rotl(d, 11);
    this.#c = c | 0;
    this.#d = d | 0;
    return result;
  }

  /** A whole number from 0 to n - 1, unbiased (a draw past the last whole multiple of n is drawn again). */
  below(n: number): number {
    if (!Number.isSafeInteger(n) || n < 1 || n > 0x1_0000_0000) throw new RangeError(`below(${n}): n is a whole number from 1 to 2^32`);
    const limit = 0x1_0000_0000 - (0x1_0000_0000 % n);
    for (;;) {
      const x = this.u32();
      if (x < limit) return x % n;
    }
  }

  /** A whole number from lo to hi, both included. */
  between(lo: number, hi: number): number {
    if (hi < lo) throw new RangeError(`between(${lo}, ${hi}): hi is below lo`);
    return lo + this.below(hi - lo + 1);
  }

  /** True k times in n. */
  chance(k: number, n: number): boolean {
    return this.below(n) < k;
  }

  pick<T>(items: readonly T[]): T {
    if (items.length === 0) throw new RangeError('pick from no items');
    return items[this.below(items.length)]!;
  }

  /** One of `options`, each [weight, value] (whole weights, at least one above 0). */
  weighted<T>(options: readonly (readonly [number, T])[]): T {
    let total = 0;
    for (const [w] of options) total += w;
    let x = this.below(total);
    for (const [w, value] of options) {
      if (x < w) return value;
      x -= w;
    }
    throw new RangeError('weighted: no option took the draw');
  }

  /** weighted over thunks: only the option drawn is built, so an option not taken draws nothing from the stream. */
  choose<T>(options: readonly (readonly [number, () => T])[]): T {
    return this.weighted(options)();
  }
}

/** The stream of `purpose` and `index` under the instance seed (64 hex characters). */
export function streamFor(seedHex: string, purpose: string, index: number): Rng {
  if (!/^[0-9a-f]{64}$/.test(seedHex)) throw new RangeError('the instance seed is 64 lowercase hex characters');
  const idx = Buffer.alloc(4);
  idx.writeUInt32BE(index);
  const key = createHash('sha256').update(RNG_DOMAIN).update(Buffer.from([0])).update(purpose).update(Buffer.from([0])).update(Buffer.from(seedHex, 'hex')).update(idx).digest();
  return new Rng(key);
}
