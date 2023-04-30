import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseConditionalExpression } from './conditional-expression';

const { error, ok, unused } = createParseAssert(parseConditionalExpression);

suite('ConditionalExpression', () => {
  test('"LogicalORExpression"', () => {
    unused();
    ok('a');
    ok('(1+2)');
  });

  test('"LogicalORExpression ? Expression : Expression"', () => {
    ok('a?b:c');
    error('a?');
    error('a?b');
    error('a?b:');
  });

  it('should respect operator precedence', () => {
    ok('a?b?c:d:e');
    error('a?b?');
    error('a?b?c');
    error('a?b?c:');
    error('a?b?c:d');
    error('a?b?c:d:');
  });
});
