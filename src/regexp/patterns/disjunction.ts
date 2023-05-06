import { PatternType } from '../pattern-type';
import { BasePattern } from './base-pattern';
import { RegExpPattern } from './pattern';

export class Disjunction extends BasePattern {
  readonly type = PatternType.Disjunction;

  constructor(readonly alternatives: RegExpPattern[]) {
    super();

    if (alternatives.length === 0) {
      throw new Error('Alternation must contain at least one alternative.');
    }
  }
}
