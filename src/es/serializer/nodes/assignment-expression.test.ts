import { expect, suite, test } from 'vitest';
import { AssignmentExpression, Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('AssignmentExpression', () => {
  test('LeftHandSideExpression[?Yield, ?Await] = AssignmentExpression[?In, ?Yield, ?Await]', () => {
    expect(
      serialize(AssignmentExpression('=', Identifier('a'), Identifier('b'))),
    ).toBe('a=b');
  });

  test(
    'LeftHandSideExpression[?Yield, ?Await] AssignmentOperator ' +
      'AssignmentExpression[?In, ?Yield, ?Await]',
    () => {
      expect(
        serialize(
          AssignmentExpression('**=', Identifier('a'), Identifier('b')),
        ),
      ).toBe('a**=b');
    },
  );

  test(
    'LeftHandSideExpression[?Yield, ?Await] &&= ' +
      'AssignmentExpression[?In, ?Yield, ?Await]',
    () => {
      expect(
        serialize(
          AssignmentExpression('&&=', Identifier('a'), Identifier('b')),
        ),
      ).toBe('a&&=b');
    },
  );

  test(
    'LeftHandSideExpression[?Yield, ?Await] ||= ' +
      'AssignmentExpression[?In, ?Yield, ?Await]',
    () => {
      expect(
        serialize(
          AssignmentExpression('||=', Identifier('a'), Identifier('b')),
        ),
      ).toBe('a||=b');
    },
  );

  test(
    'LeftHandSideExpression[?Yield, ?Await] ??= ' +
      'AssignmentExpression[?In, ?Yield, ?Await]',
    () => {
      expect(
        serialize(
          AssignmentExpression('??=', Identifier('a'), Identifier('b')),
        ),
      ).toBe('a??=b');
    },
  );
});
