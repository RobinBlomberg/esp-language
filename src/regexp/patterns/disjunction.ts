import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';
import { Quantifiable } from './quantifiable';

export class Disjunction extends Quantifiable {
  readonly type = PatternType.Disjunction;

  constructor(readonly alternatives: RegExpPattern[]) {
    super();

    if (alternatives.length === 0) {
      throw new Error('Alternation must contain at least one alternative.');
    }
  }
}
