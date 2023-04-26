import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUnaryExpression } from './unary-expression';

const { error, ok, unused } = createParseAssert(parseUnaryExpression);

suite('UnaryExpression', () => {
  test('"UpdateExpression"', () => {
    unused();
    ok('UpdateExpression');
  });

  test('"- UnaryExpression"', () => {
    ok('-UnaryExpression');
    error('-');
  });

  test('"! UnaryExpression"', () => {
    ok('!UnaryExpression');
    error('!');
  });

  it('should handle nested unary expressions', () => {
    ok('!-UnaryExpression');
  });
});
