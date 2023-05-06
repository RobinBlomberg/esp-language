import { RegExpPattern } from './pattern';
import { Quantifier } from './quantifier';

export class Quantifiable {
  optional(this: RegExpPattern) {
    return new Quantifier(this, 0, 1, false);
  }

  plus(this: RegExpPattern) {
    return new Quantifier(this, 1, Infinity, false);
  }

  repeat(this: RegExpPattern, minCount: number, maxCount = minCount) {
    return new Quantifier(this, minCount, maxCount, false);
  }

  star(this: RegExpPattern) {
    return new Quantifier(this, 0, Infinity, false);
  }
}
