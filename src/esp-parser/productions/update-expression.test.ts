import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { error, ok, throws, unused } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test('"LeftHandSideExpression"', () => {
    unused();
    ok('a');
    ok('a.b');
  });

  test('"LeftHandSideExpression ++"', () => {
    ok('a++');
    ok('a.b++');
    throws('a()++');
  });

  test('"LeftHandSideExpression --"', () => {
    ok('a--');
  });

  test('"++ UnaryExpression"', () => {
    ok('++a');
    ok('++a.b');
    error('++');
    throws('++a()');
  });

  test('"-- UnaryExpression"', () => {
    ok('--a');
    error('--');
  });
});
