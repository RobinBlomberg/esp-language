import { PatternType } from '../pattern-type';
import { Quantifiable } from './quantifiable';

/**
 * @see https://tc39.es/ecma262/#prod-RegularExpressionClass
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
 */
export const CHARACTER_REGEXP =
  /^(?:[^.*+?^${}()|[\]\\]|\.|\\.|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]{4}\}|\\[pP]\{[^}]+\}|\[(?:[^\]\\]|\\.)*\])$/;

export const CHARACTER_SEQUENCE_REGEXP = new RegExp(
  `${CHARACTER_REGEXP.source.slice(0, -1)}+$`,
);

export class CharacterSequence extends Quantifiable {
  readonly type = PatternType.CharacterSequence;

  constructor(readonly value: string | RegExp) {
    super();

    if (typeof value === 'string') {
      if (value.length === 0) {
        throw new Error('Character sequence must be least 1 character.');
      }
    } else if (!CHARACTER_SEQUENCE_REGEXP.test(value.source)) {
      throw new Error(
        `Invalid RegExp for character sequence: /${value.source}/${value.flags}\n` +
          'Pattern may only contain a sequence of characters or character classes.',
      );
    }
  }
}
