import { test } from 'vitest';
import { literal } from '../node-factory';
import { parseLiteral } from './literal';
import { createParseAssert } from '../test-utils';

const { fail, ok } = createParseAssert(parseLiteral);

test('Literal', () => {
  ok(' false ', literal(1, 6, false));
  ok('Infinity', literal(0, 8, Infinity));
  ok('NaN', literal(0, 3, NaN));
  ok('null', literal(0, 4, null));
  ok('true', literal(0, 4, true));
  ok('undefined', literal(0, 9, undefined));
  ok('0.123', literal(0, 5, 0.123));
  ok('"ab\\"cd"', literal(0, 8, 'ab"cd'));
  fail('falsey');
});
