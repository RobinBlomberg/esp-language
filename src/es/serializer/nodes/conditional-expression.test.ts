import { expect, it, suite, test } from 'vitest';
import {
  ConditionalExpression,
  Identifier,
  LogicalExpression,
} from '../../ast';
import { serialize } from '../serialize';

suite('ConditionalExpression', () => {
  test('ShortCircuitExpression[?In, ?Yield, ?Await]', () => {
    expect(
      serialize(LogicalExpression('||', Identifier('a'), Identifier('b'))),
    ).toBe('a||b');
  });

  test(
    'ShortCircuitExpression[?In, ?Yield, ?Await] ? AssignmentExpression[+In, ?Yield, ?Await] : ' +
      'AssignmentExpression[?In, ?Yield, ?Await]',
    () => {
      expect(
        serialize(
          ConditionalExpression(
            LogicalExpression('||', Identifier('a'), Identifier('b')),
            Identifier('c'),
            Identifier('d'),
          ),
        ),
      ).toBe('a||b?c:d');
    },
  );

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        ConditionalExpression(
          ConditionalExpression(
            Identifier('a'),
            Identifier('b'),
            Identifier('c'),
          ),
          Identifier('d'),
          Identifier('e'),
        ),
      ),
    ).toBe('(a?b:c)?d:e');
  });
});
