import { $ } from '../regexp-builder';

const digit = $.range('0', '9');
const nonZeroDigit = $.range('1', '9');
const integer = $.or(
  '0',
  $.concat($.charClass(nonZeroDigit), $.charClass(digit).zeroOrMore()),
);
const nonSpaces = $.not(' ').oneOrMore();

export const INTEGER_REGEXP = $.concat($.start(), integer, $.end()).regex();

export const STACK_FRAME_REGEXP = $.concat(
  $.start(),
  $('    at '),
  $.group(
    $.group(nonSpaces, $(' ('), nonSpaces, $(' at ')).optional(),
    nonSpaces.capture(),
    $(' '),
    $('(').optional(),
  ).optional(),
  $.any().oneOrMore().lazy().capture(),
  $(':'),
  integer.capture(),
  $(':'),
  integer.capture(),
).regex();
