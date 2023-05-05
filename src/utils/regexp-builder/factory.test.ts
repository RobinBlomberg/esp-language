import { expect, test } from 'vitest';
import { $ } from './factory';

test('regexp-builder#factory', () => {
  expect(
    $.concat(
      $.start(),
      $.or(
        '0',
        $.concat($.range('1', '9').class(), $.range('0', '9').class().star()),
      ),
      $.end(),
    ).regex(),
  ).toStrictEqual(/^0|[1-9][0-9]*$/);

  expect(
    $.concat(
      /^/,
      $.class($.range('a', 'z'), $.range('A', 'Z'), '$_'),
      /[a-zA-Z0-9$_]*/,
      /\(/,
      /(.*)/,
      /\)/,
      /$/,
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
      $.range('0', '9').class().plus().capture(),
      $(':'),
      $.range('0', '9').class().plus().capture(),
    ).regex(),
  ).toStrictEqual(
    /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
  );
});
