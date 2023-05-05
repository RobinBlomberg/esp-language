import { $ } from '../regexp-builder';

const digit = $.range('0', '9').class();
const nonZeroDigit = $.range('1', '9').class();
const integer = $.or('0', $.concat(nonZeroDigit, digit.star()));
const nonSpaces = $.not(' ').plus();

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
  $.any().plus().lazy().capture(),
  $(':'),
  integer.capture(),
  $(':'),
  integer.capture(),
).regex();
