import { describe, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLiteral } from './literal';

const { error, ok, unused } = createParseAssert(parseLiteral);

suite('Literal', () => {
  test(/* s */ `NullLiteral`, () => {
    unused();
    ok('null');
  });

  test(/* s */ `BooleanLiteral`, () => {
    ok('false');
    ok('true');
    error('falsey');
  });

  test(/* s */ `NumericLiteral`, () => {
    ok('0');
    ok('0.123');
    ok('456');
    ok('987.6543210');
    ok('Infinity');
    ok('NaN');
  });

  test(/* s */ `StringLiteral`, () => {
    describe('double-quoted strings', () => {
      ok(/* s */ ``);
      ok('"ab\\"cd"');
    });

    describe('single-quoted strings', () => {
      ok("''");
      ok("'ab\\'cd'");
    });
  });

  test(/* s */ `undefined`, () => {
    ok('undefined');
  });
});
