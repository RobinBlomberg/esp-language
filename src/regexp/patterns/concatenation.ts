import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';
import { Quantifiable } from './quantifiable';

export class Concatenation extends Quantifiable {
  readonly type = PatternType.Concatenation;

  constructor(readonly elements: RegExpPattern[]) {
    super();
  }
}
