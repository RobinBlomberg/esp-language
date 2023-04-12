import { suite, test } from 'vitest';
import { ConditionalExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseConditionalExpression } from './conditional-expression';

const { fail, ok } = createParseAssert(parseConditionalExpression);

suite('ConditionalExpression', () => {
  test('"LogicalORExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    ok('a()');
  });

  test('"LogicalORExpression ? AssignmentExpression : AssignmentExpression"', () => {
    ok(
      'a ? b : c',
      ConditionalExpression(
        0,
        9,
        Identifier(0, 1, 'a'),
        Identifier(4, 5, 'b'),
        Identifier(8, 9, 'c'),
      ),
    );
    fail('a ?');
    fail('a ? b');
    fail('a ? b :');
  });
});
