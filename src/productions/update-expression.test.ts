import { suite, test } from 'vitest';
import { Identifier, StaticMemberExpression, UpdateExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { ok, throws } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test('"LeftHandSideExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    ok('a()');
  });

  test('"LeftHandSideExpression (++|--)"', () => {
    ok('a++', UpdateExpression(0, 3, '++', Identifier(0, 1, 'a'), false));
    ok(
      'a.b++',
      UpdateExpression(
        0,
        5,
        '++',
        StaticMemberExpression(
          0,
          3,
          Identifier(0, 1, 'a'),
          Identifier(2, 3, 'b'),
        ),
        false,
      ),
    );
    throws('a()++');
  });

  test('"(++|--) UnaryExpression"', () => {
    ok('++a', UpdateExpression(0, 3, '++', Identifier(2, 3, 'a'), true));
    ok(
      '++a.b',
      UpdateExpression(
        0,
        5,
        '++',
        StaticMemberExpression(
          2,
          5,
          Identifier(2, 3, 'a'),
          Identifier(4, 5, 'b'),
        ),
        true,
      ),
    );
    throws('++a()');
  });
});
