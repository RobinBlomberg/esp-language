import { PatternType } from '../pattern-type';
import { RegExpPattern } from './pattern';

export class LookaroundAssertion {
  readonly type = PatternType.LookaroundAssertion;

  constructor(
    readonly negative: boolean,
    readonly lookbehind: boolean,
    readonly elements: RegExpPattern[],
  ) {}
}
