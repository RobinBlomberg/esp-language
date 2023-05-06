import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';

export class Disjunction {
  readonly type = PatternType.Disjunction;

  constructor(readonly alternatives: RegExpPattern[]) {
    if (alternatives.length === 0) {
      throw new Error('Alternation must contain at least one alternative.');
    }
  }
}
