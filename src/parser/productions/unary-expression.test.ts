import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUnaryExpression } from './unary-expression';

const { fail, ok } = createParseAssert(parseUnaryExpression);

suite('UnaryExpression', () => {
  test('"UpdateExpression"', () => {
    ok('UpdateExpression');
  });

  test('"- UnaryExpression"', () => {
    ok('-UnaryExpression');
    fail('-');
  });

  test('"! UnaryExpression"', () => {
    ok('!UnaryExpression');
    fail('!');
  });

  it('should handle nested unary expressions', () => {
    ok('!-UnaryExpression');
  });
});
