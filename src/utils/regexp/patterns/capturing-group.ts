import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';
import { Quantifiable } from './quantifiable';

export class CapturingGroup extends Quantifiable {
  readonly type = PatternType.CapturingGroup;

  constructor(
    readonly groupName: string | null,
    readonly elements: RegExpPattern[],
  ) {
    super();

    if (elements.length === 0) {
      throw new Error('Non-capturing group must contain at least one element.');
    }
  }

  name(name: string) {
    return new CapturingGroup(name, this.elements);
  }
}
