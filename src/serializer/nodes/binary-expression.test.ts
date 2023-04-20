import { expect, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../../estree';
import { serialize } from '../write';

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
