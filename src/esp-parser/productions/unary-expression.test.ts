import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUnaryExpression } from './unary-expression';

const { error, ok, unused } = createParseAssert(parseUnaryExpression);

suite('UnaryExpression', () => {
  test(/* s */ `UpdateExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `'-' UnaryExpression`, () => {
    ok('-a');
    error('-');
  });

  test(/* s */ `'!' UnaryExpression`, () => {
    ok('!a');
    error('!');
  });

  it('should handle nested unary expressions', () => {
    ok('!-a');
  });
});
