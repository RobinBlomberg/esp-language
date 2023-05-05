import { expect, test } from 'vitest';
import { $ } from './factory';

test('regexp-builder#factory', () => {
  expect(
    $.concat(
      $.start(),
      $.or(
        '0',
        $.concat(
          $.charClass($.range('1', '9')),
          $.charClass($.range('0', '9')).zeroOrMore(),
        ),
      ),
      $.end(),
    ).regex(),
  ).toStrictEqual(/^0|[1-9][0-9]*$/);

  expect(
    $.concat(
      $.regex(/^/),
      $.regex(/[a-zA-Z$_]/),
      $.regex(/[a-zA-Z0-9$_]*/),
      $.regex(/\(/),
      $.regex(/(.*)/),
      $.regex(/\)/),
      $.regex(/$/),
    ).regex(),
  ).toStrictEqual(/^[a-zA-Z$_][a-zA-Z0-9$_]*\((.*)\)$/);

  expect(
    $.concat(
      $.start(),
      $(' ').repeat(4),
      $('at '),
      $.group(
        $.group(
          $.not(' ').oneOrMore(),
          $(' ('),
          $.not(' ').oneOrMore(),
          $(' at '),
        ).optional(),
        $.not(' ').oneOrMore().capture(),
        $(' '),
        $('(').optional(),
      ).optional(),
      $.any().oneOrMore().lazy().capture(),
      $(':'),
      $.charClass($.range('0', '9')).oneOrMore().capture(),
      $(':'),
      $.charClass($.range('0', '9')).oneOrMore().capture(),
    ).regex(),
  ).toStrictEqual(
    /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
  );
});
