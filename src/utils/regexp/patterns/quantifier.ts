import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';

export class Quantifier {
  readonly type = PatternType.Quantifier;

  constructor(
    readonly pattern: RegExpPattern,
    readonly minCount: number,
    readonly maxCount: number,
    readonly isLazy: boolean,
  ) {
    if (minCount < 0) {
      throw new Error(
        'Quantifier minimum count must be greater than or equal to zero.',
      );
    }

    if (maxCount < minCount) {
      throw new Error(
        'Quantifier maximum count must be greater than the minimum count.',
      );
    }

    if (maxCount === 0) {
      throw new Error('Quantifier maximum count must be greater than zero.');
    }
  }

  lazy() {
    return new Quantifier(this.pattern, this.minCount, this.maxCount, true);
  }
}
