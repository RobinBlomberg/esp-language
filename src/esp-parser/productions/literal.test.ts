import { describe, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLiteral } from './literal';

const { error, ok, unused } = createParseAssert(parseLiteral);

suite('Literal', () => {
  test('"NullLiteral"', () => {
    unused();
    ok('null');
  });

  test('"BooleanLiteral"', () => {
    ok('false');
    ok('true');
    error('falsey');
  });

  test('"NumericLiteral"', () => {
    ok('0');
    ok('0.123');
    ok('456');
    ok('987.6543210');
    ok('Infinity');
    ok('NaN');
  });

  test('"StringLiteral"', () => {
    describe('double-quoted strings', () => {
      ok('""');
      ok('"ab\\"cd"');
    });

    describe('single-quoted strings', () => {
      ok("''");
      ok("'ab\\'cd'");
    });
  });

  test('"undefined"', () => {
    ok('undefined');
  });
});
