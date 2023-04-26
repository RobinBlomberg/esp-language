import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { error, ok, throws, unused } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test('"LeftHandSideExpression"', () => {
    unused();
    ok('LeftHandSideExpression');
    ok('Member.Expression');
  });

  test('"LeftHandSideExpression ++"', () => {
    ok('LeftHandSideExpression++');
    ok('Member.Expression++');
    throws('CallExpression()++');
  });

  test('"LeftHandSideExpression --"', () => {
    ok('LeftHandSideExpression--');
  });

  test('"++ UnaryExpression"', () => {
    ok('++UnaryExpression');
    ok('++Member.Expression');
    error('++');
    throws('++CallExpression()');
  });

  test('"-- UnaryExpression"', () => {
    ok('--UnaryExpression');
    error('--');
  });
});
