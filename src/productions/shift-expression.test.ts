import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseShiftExpression } from './shift-expression';

const { fail, ok } = createParseAssert(parseShiftExpression);

suite('ShiftExpression', () => {
  test('"AdditiveExpression"', () => {
    ok('AdditiveExpression');
  });

  test('"ShiftExpression << AdditiveExpression"', () => {
    ok('ShiftExpression << AdditiveExpression');
    fail('ShiftExpression <<');
  });

  test('"ShiftExpression >> AdditiveExpression"', () => {
    ok('ShiftExpression >> AdditiveExpression');
    fail('ShiftExpression >>');
  });

  test('"ShiftExpression >>> AdditiveExpression"', () => {
    ok('ShiftExpression >>> AdditiveExpression');
    fail('ShiftExpression >>>');
  });

  it('should respect operator precedence', () => {
    ok('a << b + c >> d - e');
  });
});
