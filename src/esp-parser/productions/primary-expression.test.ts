import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parsePrimaryExpression } from './primary-expression';

const { error, ok, unused } = createParseAssert(parsePrimaryExpression);

suite('PrimaryExpression', () => {
  test(/* s */ `Identifier`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `Literal`, () => {
    ok('null');
    ok('false');
    ok('true');
    ok('0');
    ok('0.123');
    ok('456');
    ok('987.6543210');
    ok('Infinity');
    ok('NaN');
    ok(/* s */ ``);
    ok('"ab\\"cd"');
    ok('undefined');
  });

  test(/* s */ `ArrayLiteral`, () => {
    ok('[]');
    ok('[1]');
    ok('[1, 2]');
    error('[');
  });

  test(/* s */ `ObjectLiteral`, () => {
    ok('{}');
    ok('{a: 1}');
    ok('{a: 1, b: 2}');
    error('{');
  });

  test(/* s */ `SetLiteral`, () => {
    ok('#{}');
    ok('#{1}');
    ok('#{1, 2}');
  });

  test(/* s */ `CoverParenthesizedExpression`, () => {
    ok('(a)');
    ok('(1+2)');
    error('(');
    error('()');
    error('(a');
  });
});
