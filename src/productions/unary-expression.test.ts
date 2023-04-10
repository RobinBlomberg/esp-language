import { suite, test } from 'vitest';
import { Identifier, UnaryExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUnaryExpression } from './unary-expression';

const { ok } = createParseAssert(parseUnaryExpression);

suite('UnaryExpression', () => {
  test('Identifier', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  test('UnaryExpression', () => {
    ok('delete a', UnaryExpression(0, 8, 'delete', Identifier(7, 8, 'a')));
  });
});
