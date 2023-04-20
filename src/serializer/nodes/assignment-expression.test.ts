import { expect, suite, test } from 'vitest';
import { AssignmentExpression, Identifier } from '../../estree';
import { serialize } from '../write';

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
