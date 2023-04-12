import { it, suite, test } from 'vitest';
import { Literal } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseLiteral } from './literal';

const { fail, ok } = createParseAssert(parseLiteral);

suite('Literal', () => {
  test('"NullLiteral"', () => {
    ok(' null ', Literal(1, 5, null));
  });

  test('"BooleanLiteral"', () => {
    ok('false', Literal(0, 5, false));
    ok('true', Literal(0, 4, true));
    fail('falsey');
  });

  test('"NumericLiteral"', () => {
    ok('0.123', Literal(0, 5, 0.123));
  });

  test('"StringLiteral"', () => {
    ok('"ab\\"cd"', Literal(0, 8, 'ab"cd'));
  });

  it('should parse certain keywords as literals', () => {
    ok('Infinity', Literal(0, 8, Infinity));
    ok('NaN', Literal(0, 3, NaN));
    ok('undefined', Literal(0, 9, undefined));
  });
});
