import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parsePrimaryExpression } from './primary-expression';

const { fail, ok } = createParseAssert(parsePrimaryExpression);

suite('PrimaryExpression', () => {
  test('"IdentifierReference"', () => {
    ok('IdentifierReference');
  });

  test('"Literal"', () => {
    ok('false');
    ok('Infinity');
    ok('NaN');
    ok('null');
    ok('true');
    ok('undefined');
    ok('0.123');
    ok('"ab\\"cd"');
  });

  test('"ArrayLiteral"', () => {
    ok('[]');
    fail('[');
  });

  test('"ObjectLiteral"', () => {
    ok('{}');
    fail('{');
  });
});
