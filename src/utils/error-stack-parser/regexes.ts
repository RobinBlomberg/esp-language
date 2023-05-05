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
} from '../regexp-builder';

const digit = range('0', '9');
const nonZeroDigit = range('1', '9');
const integer = or(
  char('0'),
  concat(nonZeroDigit.charclass(), digit.charclass().zeroOrMore()),
);
const nonSpaces = not.char(' ').oneOrMore();

export const INTEGER_REGEXP = concat(start(), integer, end()).regex();

export const STACK_FRAME_REGEXP = concat(
  start(),
  string('    at '),
  group(
    group(nonSpaces, string(' ('), nonSpaces, string(' at ')).optional(),
    nonSpaces.capture(),
    char(' '),
    char('(').optional(),
  ).optional(),
  any().oneOrMore().lazy().capture(),
  char(':'),
  integer.capture(),
  char(':'),
  integer.capture(),
).regex();
