import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { fail, ok, throws } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test('"LeftHandSideExpression"', () => {
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
    fail('++');
    throws('++CallExpression()');
  });

  test('"-- UnaryExpression"', () => {
    ok('--UnaryExpression');
    fail('--');
  });
});
