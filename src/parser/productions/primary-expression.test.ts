import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parsePrimaryExpression } from './primary-expression';

const { fail, ok } = createParseAssert(parsePrimaryExpression);

suite('PrimaryExpression', () => {
  test('"Identifier"', () => {
    ok('Identifier');
  });

  test('"Literal"', () => {
    ok('null');
    ok('false');
    ok('true');
    ok('0');
    ok('0.123');
    ok('456');
    ok('987.6543210');
    ok('Infinity');
    ok('NaN');
    ok('""');
    ok('"ab\\"cd"');
    ok('undefined');
  });

  test('"ArrayLiteral"', () => {
    ok('[]');
    ok('[1]');
    ok('[1, 2]');
    fail('[');
  });

  test('"ObjectLiteral"', () => {
    ok('{}');
    ok('{a: 1}');
    ok('{a: 1, b: 2}');
    fail('{');
  });

  test('"SetLiteral"', () => {
    ok('#{}');
    ok('#{1}');
    ok('#{1, 2}');
  });
});
