import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseStatement } from './statement';

const { ok, unused } = createParseAssert(parseStatement);

suite('Statement', () => {
  test(/* s */ `BlockStatement`, () => {
    unused();
    ok('{}');
    ok('{a;}');
    ok('{a;b;}');
  });

  test(/* s */ `BreakStatement`, () => {
    ok('break;');
  });

  test(/* s */ `ContinueStatement`, () => {
    ok('continue;');
  });

  test(/* s */ `DoWhileStatement`, () => {
    ok('do a;while(b);');
  });

  test(/* s */ `ExpressionStatement`, () => {
    ok('a;');
  });

  test(/* s */ `IfStatement`, () => {
    ok('if(a)b;');
    ok('if(a)b;else c;');
    ok('if(a)b;else if(c)d;else e;');
  });

  test(/* s */ `MatchStatement`, () => {
    ok('match(a){b c;}');
    ok('match(a){b c;d e;}');
    ok('match(a){b c;else d;}');
    ok('match(a){b c;d e;else f;}');
  });

  test(/* s */ `ReturnStatement`, () => {
    ok('return a;');
  });

  test(/* s */ `ThrowStatement`, () => {
    ok('throw a;');
  });

  test(/* s */ `VariableDeclaration`, () => {
    ok('let a=b;');
  });

  test(/* s */ `WhileStatement`, () => {
    ok('while(a)b;');
  });
});
