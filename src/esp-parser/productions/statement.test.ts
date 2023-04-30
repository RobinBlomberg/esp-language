import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseStatement } from './statement';

const { ok, unused } = createParseAssert(parseStatement);

suite('Statement', () => {
  test('"BlockStatement"', () => {
    unused();
    ok('{}');
    ok('{a;}');
    ok('{a;b;}');
  });

  test('"BreakStatement"', () => {
    ok('break;');
  });

  test('"ContinueStatement"', () => {
    ok('continue;');
  });

  test('"DoWhileStatement"', () => {
    ok('do a;while(b);');
  });

  test('"ExpressionStatement"', () => {
    ok('a;');
  });

  test('"IfStatement"', () => {
    ok('if(a)b;');
    ok('if(a)b;else c;');
    ok('if(a)b;else if(c)d;else e;');
  });

  test('"MatchStatement"', () => {
    ok('match(a){b c;}');
    ok('match(a){b c;d e;}');
    ok('match(a){b c;else d;}');
    ok('match(a){b c;d e;else f;}');
  });

  test('"ReturnStatement"', () => {
    ok('return a;');
  });

  test('"ThrowStatement"', () => {
    ok('throw a;');
  });

  test('"VariableDeclaration"', () => {
    ok('let a=b;');
  });

  test('"WhileStatement"', () => {
    ok('while(a)b;');
  });
});
