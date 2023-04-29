import { expect, it, suite, test } from 'vitest';
import {
  BinaryExpression,
  BinaryOperator,
  Identifier,
  LogicalExpression,
  PrivateIdentifier,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('BinaryExpression', () => {
  const tests = {
    '|': 'BitwiseORExpression[?In, ?Yield, ?Await] | BitwiseXORExpression[?In, ?Yield, ?Await]',
    '^': 'BitwiseXORExpression[?In, ?Yield, ?Await] ^ BitwiseANDExpression[?In, ?Yield, ?Await]',
    '&': 'BitwiseANDExpression[?In, ?Yield, ?Await] & EqualityExpression[?In, ?Yield, ?Await]',
    '==': 'EqualityExpression[?In, ?Yield, ?Await] == RelationalExpression[?In, ?Yield, ?Await]',
    '!=': 'EqualityExpression[?In, ?Yield, ?Await] != RelationalExpression[?In, ?Yield, ?Await]',
    '===':
      'EqualityExpression[?In, ?Yield, ?Await] === RelationalExpression[?In, ?Yield, ?Await]',
    '!==':
      'EqualityExpression[?In, ?Yield, ?Await] !== RelationalExpression[?In, ?Yield, ?Await]',
    '<': 'RelationalExpression[?In, ?Yield, ?Await] < ShiftExpression[?Yield, ?Await]',
    '>': 'RelationalExpression[?In, ?Yield, ?Await] > ShiftExpression[?Yield, ?Await]',
    '<=': 'RelationalExpression[?In, ?Yield, ?Await] <= ShiftExpression[?Yield, ?Await]',
    '>=': 'RelationalExpression[?In, ?Yield, ?Await] >= ShiftExpression[?Yield, ?Await]',
    instanceof:
      'RelationalExpression[?In, ?Yield, ?Await] instanceof ShiftExpression[?Yield, ?Await]',
    in: '[+In] RelationalExpression[+In, ?Yield, ?Await] in ShiftExpression[?Yield, ?Await]',
    '<<': 'ShiftExpression[?Yield, ?Await] << AdditiveExpression[?Yield, ?Await]',
    '>>': 'ShiftExpression[?Yield, ?Await] >> AdditiveExpression[?Yield, ?Await]',
    '>>>':
      'ShiftExpression[?Yield, ?Await] >>> AdditiveExpression[?Yield, ?Await]',
    '+': 'AdditiveExpression[?Yield, ?Await] + MultiplicativeExpression[?Yield, ?Await]',
    '-': 'AdditiveExpression[?Yield, ?Await] - MultiplicativeExpression[?Yield, ?Await]',
    '**': 'UpdateExpression[?Yield, ?Await] ** ExponentiationExpression[?Yield, ?Await]',
  };

  for (const [operator, name] of Object.entries(tests)) {
    const space = /[a-z]/.test(operator) ? ' ' : '';

    test(name, () => {
      expect(
        serialize(
          BinaryExpression(
            operator as BinaryOperator,
            Identifier('a'),
            Identifier('b'),
          ),
        ),
      ).toBe(`a${space}${operator}${space}b`);
    });
  }

  test('[+In] PrivateIdentifier in ShiftExpression[?Yield, ?Await]', () => {
    expect(
      serialize(
        BinaryExpression('in', PrivateIdentifier('a'), Identifier('b')),
      ),
    ).toBe('#a in b');
  });

  suite(
    'MultiplicativeExpression[?Yield, ?Await] MultiplicativeOperator ' +
      'ExponentiationExpression[?Yield, ?Await]',
    () => {
      for (const operator of ['*', '/', '%'] as const) {
        test(operator, () => {
          expect(
            serialize(
              BinaryExpression(operator, Identifier('a'), Identifier('b')),
            ),
          ).toBe(`a${operator}b`);
        });
      }
    },
  );

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        BinaryExpression(
          '+',
          Identifier('a'),
          BinaryExpression('+', Identifier('b'), Identifier('c')),
        ),
      ),
    ).toBe('a+(b+c)');

    expect(
      serialize(
        BinaryExpression(
          '+',
          Identifier('a'),
          LogicalExpression('||', Identifier('b'), Identifier('c')),
        ),
      ),
    ).toBe('a+(b||c)');
  });
});
