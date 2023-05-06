import { PatternType } from '../pattern-type';
import { BasePattern } from './base-pattern';
import { RegExpPattern } from './pattern';

export class LookaroundAssertion extends BasePattern {
  readonly type = PatternType.LookaroundAssertion;

  constructor(
    readonly negative: boolean,
    readonly lookbehind: boolean,
    readonly elements: RegExpPattern[],
  ) {
    super();
  }
}
