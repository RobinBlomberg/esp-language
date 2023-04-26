import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseShiftExpression } from './shift-expression';

const { error, ok, unused } = createParseAssert(parseShiftExpression);

suite('ShiftExpression', () => {
  test('"AdditiveExpression"', () => {
    unused();
    ok('AdditiveExpression');
  });

  test('"ShiftExpression << AdditiveExpression"', () => {
    ok('ShiftExpression << AdditiveExpression');
    error('ShiftExpression <<');
  });

  test('"ShiftExpression >> AdditiveExpression"', () => {
    ok('ShiftExpression >> AdditiveExpression');
    error('ShiftExpression >>');
  });

  test('"ShiftExpression >>> AdditiveExpression"', () => {
    ok('ShiftExpression >>> AdditiveExpression');
    error('ShiftExpression >>>');
  });

  it('should respect operator precedence', () => {
    ok('a << b + c >> d - e');
  });
});
