import { suite, test } from 'vitest';
import { ArrayLiteral, Identifier, Literal, ObjectLiteral } from '../ast';
import { createParseAssert } from '../test-utils';
import { parsePrimaryExpression } from './primary-expression';

const { fail, ok } = createParseAssert(parsePrimaryExpression);

suite('PrimaryExpression', () => {
  test('"IdentifierReference"', () => {
    ok('falsey', Identifier(0, 6, 'falsey'));
  });

  test('"Literal"', () => {
    ok('false', Literal(0, 5, false));
    ok('Infinity', Literal(0, 8, Infinity));
    ok('NaN', Literal(0, 3, NaN));
    ok('null', Literal(0, 4, null));
    ok('true', Literal(0, 4, true));
    ok('undefined', Literal(0, 9, undefined));
    ok('0.123', Literal(0, 5, 0.123));
    ok('"ab\\"cd"', Literal(0, 8, 'ab"cd'));
  });

  test('"ArrayLiteral"', () => {
    ok('[]', ArrayLiteral(0, 2, []));
    fail('[');
  });

  test('"ObjectLiteral"', () => {
    ok('{}', ObjectLiteral(0, 2, []));
    fail('{');
  });
});
