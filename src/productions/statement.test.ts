import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseStatement } from './statement';

const { fail, ok } = createParseAssert(parseStatement);

suite('Statement', () => {
  test('"BlockStatement"', () => {
    ok('{}');
    fail('{');
  });

  test('"ExpressionStatement"', () => {
    ok('ExpressionStatement;');
    fail('ExpressionStatement');
  });

  test('"IfStatement"', () => {
    ok('if (Expression) Statement; else Statement;');
    ok('if (a) b; else if (c) d; else e;');
    fail('if (Expression)');
  });

  test('"WhileStatement"', () => {
    ok('while ( Expression ) Statement;');
    fail('while');
    fail('while (');
    fail('while (Expression');
    fail('while (Expression)');
  });
});
