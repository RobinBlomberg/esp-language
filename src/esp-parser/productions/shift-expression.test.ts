import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseShiftExpression } from './shift-expression';

const { error, ok, unused } = createParseAssert(parseShiftExpression);

suite('ShiftExpression', () => {
  test('"AdditiveExpression"', () => {
    unused();
    ok('a');
  });

  test('"ShiftExpression << AdditiveExpression"', () => {
    ok('a<<b');
    error('a<<');
  });

  test('"ShiftExpression >> AdditiveExpression"', () => {
    ok('a>>b');
    error('a>>');
  });

  test('"ShiftExpression >>> AdditiveExpression"', () => {
    ok('a>>>b');
    error('a>>>');
  });

  it('should respect operator precedence', () => {
    ok('a<<b+c>>d-e');
  });
});
