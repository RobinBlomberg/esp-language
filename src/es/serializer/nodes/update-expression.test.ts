import { expect, suite, test } from 'vitest';
import { Identifier, UnaryExpression, UpdateExpression } from '../../ast';
import { serialize } from '../serialize';

suite('UpdateExpression', () => {
  test('LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] ++', () => {
    expect(serialize(UpdateExpression('++', Identifier('a'), false))).toBe(
      'a++',
    );
  });

  test('LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] --', () => {
    expect(serialize(UpdateExpression('--', Identifier('a'), false))).toBe(
      'a--',
    );
  });

  test('++ UnaryExpression[?Yield, ?Await]', () => {
    expect(
      serialize(
        UpdateExpression(
          '++',
          UnaryExpression('!', true, Identifier('a')),
          true,
        ),
      ),
    ).toBe('++!a');
  });

  test('-- UnaryExpression[?Yield, ?Await]', () => {
    expect(
      serialize(
        UpdateExpression(
          '--',
          UnaryExpression('!', true, Identifier('a')),
          true,
        ),
      ),
    ).toBe('--!a');
  });
});
