import { expect, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier, UnaryExpression } from '../../es-ast';
import { serialize } from '../serialize';

suite('UnaryExpression', () => {
  test('delete UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('delete', true, Identifier('a')))).toBe(
      'delete a',
    );
  });

  test('void UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('void', true, Identifier('a')))).toBe(
      'void a',
    );
  });

  test('typeof UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('typeof', true, Identifier('a')))).toBe(
      'typeof a',
    );
  });

  test('+ UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('+', true, Identifier('a')))).toBe('+a');
  });

  test('- UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('-', true, Identifier('a')))).toBe('-a');
  });

  test('~ UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('~', true, Identifier('a')))).toBe('~a');
  });

  test('! UnaryExpression[?Yield, ?Await]', () => {
    expect(serialize(UnaryExpression('!', true, Identifier('a')))).toBe('!a');
  });

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        UnaryExpression(
          '!',
          true,
          BinaryExpression('+', Identifier('a'), Identifier('b')),
        ),
      ),
    ).toBe('!(a+b)');
  });
});
