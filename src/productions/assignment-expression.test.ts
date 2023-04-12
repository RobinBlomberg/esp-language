import { suite, test } from 'vitest';
import { AssignmentExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseAssignmentExpression } from './assignment-expression';

const { ok } = createParseAssert(parseAssignmentExpression);

suite('AssignmentExpression', () => {
  test('"LeftHandSideExpression AssignmentOperator AssignmentExpression"', () => {
    ok(
      'a = b',
      AssignmentExpression(
        0,
        5,
        '=',
        Identifier(0, 1, 'a'),
        Identifier(4, 5, 'b'),
      ),
    );
  });
});
