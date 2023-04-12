import { suite, test } from 'vitest';
import {
  Arguments,
  CallExpression,
  ExpressionStatement,
  Identifier,
  StaticMemberExpression,
} from '../ast';
import { createParseAssert } from '../test-utils';
import { parseExpressionStatement } from './expression-statement';

const { fail, ok } = createParseAssert(parseExpressionStatement);

suite('ExpressionStatement', () => {
  test('"Expression ;"', () => {
    ok(' abc; ', ExpressionStatement(1, 5, Identifier(1, 4, 'abc')));
    ok(
      'a.b();',
      ExpressionStatement(
        0,
        6,
        CallExpression(
          0,
          5,
          StaticMemberExpression(
            0,
            3,
            Identifier(0, 1, 'a'),
            Identifier(2, 3, 'b'),
          ),
          Arguments(3, 5, []),
        ),
      ),
    );
    fail(' ');
    fail('a');
    fail(';');
    fail('a b');
  });
});
