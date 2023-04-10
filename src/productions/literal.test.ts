import { test } from 'vitest';
import { Literal } from '../ast';
import { parseLiteral } from './literal';
import { createParseAssert } from '../test-utils';

const { fail, ok } = createParseAssert(parseLiteral);

test('Literal', () => {
  ok(' false ', Literal(1, 6, false));
  ok('Infinity', Literal(0, 8, Infinity));
  ok('NaN', Literal(0, 3, NaN));
  ok('null', Literal(0, 4, null));
  ok('true', Literal(0, 4, true));
  ok('undefined', Literal(0, 9, undefined));
  ok('0.123', Literal(0, 5, 0.123));
  ok('"ab\\"cd"', Literal(0, 8, 'ab"cd'));
  fail('falsey');
});
