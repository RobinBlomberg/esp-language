import { expect, test } from 'vitest';
import {
  any,
  char,
  concat,
  end,
  group,
  not,
  or,
  range,
  start,
  string,
} from './factory';

test('regexp-builder#factory', () => {
  expect(
    concat(
      start(),
      or(
        char('0'),
        concat(
          range('1', '9').charclass(),
          range('0', '9').charclass().zeroOrMore(),
        ),
      ),
      end(),
    ).regex(),
  ).toStrictEqual(/^0|[1-9][0-9]*$/);

  expect(
    concat(
      start(),
      char(' ').repeat(4),
      string('at '),
      group(
        group(
          not.char(' ').oneOrMore(),
          string(' ('),
          not.char(' ').oneOrMore(),
          string(' at '),
        ).optional(),
        not.char(' ').oneOrMore().capture(),
        char(' '),
        char('(').optional(),
      ).optional(),
      any().oneOrMore().lazy().capture(),
      char(':'),
      range('0', '9').charclass().oneOrMore().capture(),
      char(':'),
      range('0', '9').charclass().oneOrMore().capture(),
    ).regex(),
  ).toStrictEqual(
    /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
  );
});
