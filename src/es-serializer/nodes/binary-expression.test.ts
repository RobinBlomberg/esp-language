import { expect, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('BinaryExpression', () => {
  test(
    'BitwiseORExpression[?In, ?Yield, ?Await] | ' +
      'BitwiseXORExpression[?In, ?Yield, ?Await]',
    () => {
      expect(
        serialize(BinaryExpression('|', Identifier('a'), Identifier('b'))),
      ).toBe('a|b');
    },
  );
});
