import { it, suite, test } from 'vitest';
import { Identifier, UnaryExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUnaryExpression } from './unary-expression';

const { fail, ok } = createParseAssert(parseUnaryExpression);

suite('UnaryExpression', () => {
  test('"UpdateExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    ok('deletes a', Identifier(0, 7, 'deletes'));
  });

  test('"delete UnaryExpression"', () => {
    ok('delete a', UnaryExpression(0, 8, 'delete', Identifier(7, 8, 'a')));
    fail('delete');
  });

  test('"void UnaryExpression"', () => {
    ok('void a', UnaryExpression(0, 6, 'void', Identifier(5, 6, 'a')));
    fail('void');
  });

  test('"typeof UnaryExpression"', () => {
    ok('typeof a', UnaryExpression(0, 8, 'typeof', Identifier(7, 8, 'a')));
    fail('typeof');
  });

  test('"+ UnaryExpression"', () => {
    ok('+ a', UnaryExpression(0, 3, '+', Identifier(2, 3, 'a')));
    fail('+');
  });

  test('"- UnaryExpression"', () => {
    ok('- a', UnaryExpression(0, 3, '-', Identifier(2, 3, 'a')));
    fail('-');
  });

  test('"~ UnaryExpression"', () => {
    ok('~ a', UnaryExpression(0, 3, '~', Identifier(2, 3, 'a')));
    fail('~');
  });

  test('"! UnaryExpression"', () => {
    ok('! a', UnaryExpression(0, 3, '!', Identifier(2, 3, 'a')));
    fail('!');
  });

  it('should handle nested unary expressions', () => {
    ok(
      '!!a',
      UnaryExpression(
        0,
        3,
        '!',
        UnaryExpression(1, 3, '!', Identifier(2, 3, 'a')),
      ),
    );
  });
});
