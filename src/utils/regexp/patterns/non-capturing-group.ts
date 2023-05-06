import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';
import { Quantifiable } from './quantifiable';

export class NonCapturingGroup extends Quantifiable {
  readonly type = PatternType.NonCapturingGroup;

  constructor(readonly elements: RegExpPattern[]) {
    super();

    if (elements.length === 0) {
      throw new Error('Non-capturing group must contain at least one element.');
    }
  }
}
