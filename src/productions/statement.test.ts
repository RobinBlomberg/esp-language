import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseStatement } from './statement';

const { ok } = createParseAssert(parseStatement);

suite('Statement', () => {
  test('"BlockStatement"', () => {
    ok('{}');
  });

  test('"DoWhileStatement"', () => {
    ok('do Statement; while ( Expression ) ;');
  });

  test('"ExpressionStatement"', () => {
    ok('ExpressionStatement;');
  });

  test('"IfStatement"', () => {
    ok('if (Expression) Statement; else Statement;');
    ok('if (a) b; else if (c) d; else e;');
  });

  test('"VariableDeclaration"', () => {
    ok('let Identifier = Expression;');
  });

  test('"WhileStatement"', () => {
    ok('while ( Expression ) Statement;');
  });
});