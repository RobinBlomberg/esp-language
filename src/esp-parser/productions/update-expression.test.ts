import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { error, ok, throws, unused } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test(/* s */ `LeftHandSideExpression`, () => {
    unused();
    ok('a');
    ok('a.b');
  });

  test(/* s */ `LeftHandSideExpression '++'`, () => {
    ok('a++');
    ok('a.b++');
    throws('a()++');
  });

  test(/* s */ `LeftHandSideExpression '--'`, () => {
    ok('a--');
  });

  test(/* s */ `'++' UnaryExpression`, () => {
    ok('++a');
    ok('++a.b');
    error('++');
    throws('++a()');
  });

  test(/* s */ `'--' UnaryExpression`, () => {
    ok('--a');
    error('--');
  });
});
