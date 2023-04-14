import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseStatement } from './statement';

const { ok } = createParseAssert(parseStatement);

suite('Statement', () => {
  test('"BlockStatement"', () => {
    ok('{}');
    ok('{ Statement; }');
    ok('{ Statement; Statement; }');
  });

  test('"BreakStatement"', () => {
    ok('break;');
  });

  test('"ContinueStatement"', () => {
    ok('continue;');
  });

  test('"DoWhileStatement"', () => {
    ok('do Statement; while (Expression);');
  });

  test('"ExpressionStatement"', () => {
    ok('Expression;');
  });

  test('"IfStatement"', () => {
    ok('if (Expression) Statement;');
    ok('if (Expression) Statement; else Statement;');
    ok('if (a) b; else if (c) d; else e;');
  });

  test('"MatchStatement"', () => {
    ok('match (Expression) { Case Block; }');
    ok('match (Expression) { Case Block; Case Block; }');
    ok('match (Expression) { Case Block; else Statement; }');
    ok('match (Expression) { Case Block; Case Block; else Statement; }');
  });

  test('"ReturnStatement"', () => {
    ok('return Expression;');
  });

  test('"ThrowStatement"', () => {
    ok('throw Expression;');
  });

  test('"VariableDeclaration"', () => {
    ok('let Identifier = Expression;');
  });

  test('"WhileStatement"', () => {
    ok('while (Expression) Statement;');
  });
});
