import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';

export class Concatenation {
  readonly type = PatternType.Concatenation;

  constructor(readonly elements: RegExpPattern[]) {}
}
