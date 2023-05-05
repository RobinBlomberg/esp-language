import { expect, test } from 'vitest';
import {
  any,
  char,
  charClass,
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
          charClass(range('1', '9')),
          charClass(range('0', '9')).zeroOrMore(),
        ),
      ),
      end(),
    ).regex(),
  ).toStrictEqual(/^0|[1-9][0-9]*$/);

  expect(
    concat(
      start(),
      charClass(range('a', 'z'), range('A', 'Z'), char('$'), char('_')),
      charClass(
        range('a', 'z'),
        range('A', 'Z'),
        range('0', '9'),
        char('$'),
        char('_'),
      ).zeroOrMore(),
      end(),
    ).regex(),
  ).toStrictEqual(/^[a-zA-Z$_][a-zA-Z0-9$_]*$/);

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
      charClass(range('0', '9')).oneOrMore().capture(),
      char(':'),
      charClass(range('0', '9')).oneOrMore().capture(),
    ).regex(),
  ).toStrictEqual(
    /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
  );
});
