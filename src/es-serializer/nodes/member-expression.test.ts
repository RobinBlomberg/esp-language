import { expect, it, suite, test } from 'vitest';
import {
  ChainExpression,
  Identifier,
  MemberExpression,
  PrivateIdentifier,
  Super,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('MemberExpression', () => {
  test('MemberExpression[?Yield, ?Await] [ Expression[+In, ?Yield, ?Await] ]', () => {
    expect(
      serialize(
        MemberExpression(Identifier('a'), Identifier('b'), true, false),
      ),
    ).toBe('a[b]');
  });

  test('MemberExpression[?Yield, ?Await] . IdentifierName', () => {
    expect(
      serialize(
        MemberExpression(Identifier('a'), Identifier('b'), false, false),
      ),
    ).toBe('a.b');
  });

  suite('SuperProperty[?Yield, ?Await]', () => {
    test('super [ Expression[+In, ?Yield, ?Await] ]', () => {
      expect(
        serialize(MemberExpression(Super(), Identifier('a'), true, false)),
      ).toBe('super[a]');
    });

    test('super . IdentifierName', () => {
      expect(
        serialize(MemberExpression(Super(), Identifier('a'), false, false)),
      ).toBe('super.a');
    });
  });

  suite('MetaProperty', () => {
    suite('NewTarget', () => {
      test('new . target', () => {
        expect(
          serialize(
            MemberExpression(
              Identifier('new'),
              Identifier('target'),
              false,
              false,
            ),
          ),
        ).toBe('new.target');
      });
    });

    suite('ImportMeta', () => {
      test('import . meta', () => {
        expect(
          serialize(
            MemberExpression(
              Identifier('import'),
              Identifier('meta'),
              false,
              false,
            ),
          ),
        ).toBe('import.meta');
      });
    });
  });

  test('MemberExpression[?Yield, ?Await] . PrivateIdentifier', () => {
    expect(
      serialize(
        MemberExpression(Identifier('a'), PrivateIdentifier('b'), false, false),
      ),
    ).toBe('a.#b');
  });

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        MemberExpression(
          ChainExpression(
            MemberExpression(Identifier('a'), Identifier('b'), false, true),
          ),
          Identifier('c'),
          false,
          false,
        ),
      ),
    ).toBe('(a?.b).c');
  });
});
