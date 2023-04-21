import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseConditionalExpression } from './conditional-expression';

const { fail, ok } = createParseAssert(parseConditionalExpression);

suite('ConditionalExpression', () => {
  test('"LogicalORExpression"', () => {
    ok('LogicalORExpression');
  });

  test('"LogicalORExpression ? Expression : Expression"', () => {
    ok('LogicalORExpression ? Expression : Expression');
    fail('LogicalORExpression ?');
    fail('LogicalORExpression ? Expression');
    fail('LogicalORExpression ? Expression :');
  });

  it('should respect operator precedence', () => {
    ok('a ? b ? c : d : e');
    fail('a ? b ?');
    fail('a ? b ? c');
    fail('a ? b ? c :');
    fail('a ? b ? c : d');
    fail('a ? b ? c : d :');
  });
});
