import { test } from 'vitest';
import { identifier, literal } from '../node-factory';
import { createParseAssert } from '../test-utils';
import { parsePrimaryExpression } from './primary-expression';

const { ok } = createParseAssert(parsePrimaryExpression);

test('PrimaryExpression', () => {
  ok('false', literal(0, 5, false));
  ok('Infinity', literal(0, 8, Infinity));
  ok('NaN', literal(0, 3, NaN));
  ok('null', literal(0, 4, null));
  ok('true', literal(0, 4, true));
  ok('undefined', literal(0, 9, undefined));
  ok('0.123', literal(0, 5, 0.123));
  ok('"ab\\"cd"', literal(0, 8, 'ab"cd'));
  ok('falsey', identifier(0, 6, 'falsey'));
});
