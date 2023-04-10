import { it, suite, test } from 'vitest';
import { Identifier, UnaryExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUnaryExpression } from './unary-expression';

const { fail, ok } = createParseAssert(parseUnaryExpression);

suite('UnaryExpression', () => {
  it('should be able to parse basic expressions', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  test('UnaryExpression', () => {
    it('should handle non-nested unary expressions', () => {
      ok('delete a', UnaryExpression(0, 8, 'delete', Identifier(7, 8, 'a')));
      ok('void a', UnaryExpression(0, 6, 'void', Identifier(5, 6, 'a')));
      ok('typeof a', UnaryExpression(0, 8, 'typeof', Identifier(7, 8, 'a')));
      ok('+ a', UnaryExpression(0, 3, '+', Identifier(2, 3, 'a')));
      ok('- a', UnaryExpression(0, 3, '-', Identifier(2, 3, 'a')));
      ok('~ a', UnaryExpression(0, 3, '~', Identifier(2, 3, 'a')));
      ok('! a', UnaryExpression(0, 3, '!', Identifier(2, 3, 'a')));
      ok('deletes a', Identifier(0, 7, 'deletes'));
      fail('delete');
      fail('void');
      fail('typeof');
      fail('+');
      fail('-');
      fail('~');
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
});
