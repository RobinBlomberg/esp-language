import { PatternType } from '../pattern-type';
import { BasePattern } from './base-pattern';
import { RegExpPattern } from './pattern';

export class Concatenation extends BasePattern {
  readonly type = PatternType.Concatenation;

  constructor(readonly elements: RegExpPattern[]) {
    super();
  }
}
