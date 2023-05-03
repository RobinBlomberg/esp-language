import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseConditionalExpression } from './conditional-expression';

const { error, ok, unused } = createParseAssert(parseConditionalExpression);

suite('ConditionalExpression', () => {
  test(/* s */ `LogicalORExpression`, () => {
    unused();
    ok('(1+2)');
    ok('a');
  });

  test(/* s */ `LogicalORExpression '?' Expression ':' Expression`, () => {
    ok('a?b:c');
    error('a?');
    error('a?b');
    error('a?b:');
    error('a?b?');
    error('a?b?c');
    error('a?b?c:');
    error('a?b?c:d');
    error('a?b?c:d:');
  });

  it('should respect operator precedence', () => {
    ok('a?b?c:d:e');
  });
});
