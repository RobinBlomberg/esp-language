import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseShiftExpression } from './shift-expression';

const { error, ok, unused } = createParseAssert(parseShiftExpression);

suite('ShiftExpression', () => {
  test(/* s */ `AdditiveExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `ShiftExpression '<<' AdditiveExpression`, () => {
    ok('a<<b');
    error('a<<');
  });

  test(/* s */ `ShiftExpression '>>' AdditiveExpression`, () => {
    ok('a>>b');
    error('a>>');
  });

  test(/* s */ `ShiftExpression '>>>' AdditiveExpression`, () => {
    ok('a>>>b');
    error('a>>>');
  });

  it('should respect operator precedence', () => {
    ok('a<<b+c>>d-e');
  });
});
