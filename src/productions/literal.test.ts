import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLiteral } from './literal';

const { fail, ok } = createParseAssert(parseLiteral);

suite('Literal', () => {
  test('"NullLiteral"', () => {
    ok('null');
    fail(' ');
  });

  test('"BooleanLiteral"', () => {
    ok('false');
    ok('true');
    fail('falsey');
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
    ok('""');
    ok('"ab\\"cd"');
  });

  test('"undefined"', () => {
    ok('undefined');
  });
});
