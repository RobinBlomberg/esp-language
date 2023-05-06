import {
  any,
  capture,
  concat,
  createRegExp,
  end,
  group,
  one,
  or,
  start,
} from '../regexp';

const integer = or(one('0'), concat(one(/[1-9]/), one(/\d/).star()));

export const INTEGER_REGEXP = createRegExp(start, integer, end);

export const STACK_FRAME_REGEXP = createRegExp(
  start,
  one('    at '),
  group(
    group(
      one(/[^ ]/).plus(),
      one(' ('),
      one(/[^ ]/).plus(),
      one(' at '),
    ).optional(),
    capture(one(/[^ ]/).plus()).name('functionName'),
    one(' '),
    one('(').optional(),
  ).optional(),
  capture(any.plus().lazy()).name('fileName'),
  one(':'),
  capture(integer).name('lineNumber'),
  one(':'),
  capture(integer).name('columnNumber'),
);
