import { expect, test } from 'vitest';
import { $ } from './factory';

test('regexp-builder#factory', () => {
  expect(
    $.concat(
      $.start(),
      $.or(
        '0',
        $.concat($.class($.range('1', '9')), $.class($.range('0', '9')).star()),
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
          $.not(' ').plus(),
          $(' ('),
          $.not(' ').plus(),
          $(' at '),
        ).optional(),
        $.not(' ').plus().capture(),
        $(' '),
        $('(').optional(),
      ).optional(),
      $.any().plus().lazy().capture(),
      $(':'),
      $.class($.range('0', '9')).plus().capture(),
      $(':'),
      $.class($.range('0', '9')).plus().capture(),
    ).regex(),
  ).toStrictEqual(
    /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
  );
});
