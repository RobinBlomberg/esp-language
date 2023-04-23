import { expect, it, suite } from 'vitest';
import { BinaryExpression, Identifier, LogicalExpression } from '../../es-ast';
import { serialize } from '../serialize';
import { testBinaryExpression } from '../test-utils';

suite('BinaryExpression', () => {
  testBinaryExpression(
    'BitwiseORExpression[?In, ?Yield, ?Await] | BitwiseXORExpression[?In, ?Yield, ?Await]',
    '|',
  );

  testBinaryExpression(
    'BitwiseXORExpression[?In, ?Yield, ?Await] ^ BitwiseANDExpression[?In, ?Yield, ?Await]',
    '^',
  );

  testBinaryExpression(
    'BitwiseANDExpression[?In, ?Yield, ?Await] & EqualityExpression[?In, ?Yield, ?Await]',
    '&',
  );

  testBinaryExpression(
    'EqualityExpression[?In, ?Yield, ?Await] == RelationalExpression[?In, ?Yield, ?Await]',
    '==',
  );

  testBinaryExpression(
    'EqualityExpression[?In, ?Yield, ?Await] != RelationalExpression[?In, ?Yield, ?Await]',
    '!=',
  );

  testBinaryExpression(
    'EqualityExpression[?In, ?Yield, ?Await] === RelationalExpression[?In, ?Yield, ?Await]',
    '===',
  );

  testBinaryExpression(
    'EqualityExpression[?In, ?Yield, ?Await] !== RelationalExpression[?In, ?Yield, ?Await]',
    '!==',
  );

  testBinaryExpression(
    'RelationalExpression[?In, ?Yield, ?Await] < ShiftExpression[?Yield, ?Await]',
    '<',
  );

  testBinaryExpression(
    'RelationalExpression[?In, ?Yield, ?Await] > ShiftExpression[?Yield, ?Await]',
    '>',
  );

  testBinaryExpression(
    'RelationalExpression[?In, ?Yield, ?Await] <= ShiftExpression[?Yield, ?Await]',
    '<=',
  );

  testBinaryExpression(
    'RelationalExpression[?In, ?Yield, ?Await] >= ShiftExpression[?Yield, ?Await]',
    '>=',
  );

  testBinaryExpression(
    'RelationalExpression[?In, ?Yield, ?Await] instanceof ShiftExpression[?Yield, ?Await]',
    'instanceof',
  );

  testBinaryExpression(
    '[+In] RelationalExpression[+In, ?Yield, ?Await] in ShiftExpression[?Yield, ?Await]',
    'in',
  );

  testBinaryExpression(
    '[+In] PrivateIdentifier in ShiftExpression[?Yield, ?Await]',
    'in',
    true,
  );

  testBinaryExpression(
    'ShiftExpression[?Yield, ?Await] << AdditiveExpression[?Yield, ?Await]',
    '<<',
  );

  testBinaryExpression(
    'ShiftExpression[?Yield, ?Await] >> AdditiveExpression[?Yield, ?Await]',
    '>>',
  );

  testBinaryExpression(
    'ShiftExpression[?Yield, ?Await] >>> AdditiveExpression[?Yield, ?Await]',
    '>>>',
  );

  testBinaryExpression(
    'AdditiveExpression[?Yield, ?Await] + MultiplicativeExpression[?Yield, ?Await]',
    '+',
  );

  testBinaryExpression(
    'AdditiveExpression[?Yield, ?Await] - MultiplicativeExpression[?Yield, ?Await]',
    '-',
  );

  testBinaryExpression(
    'MultiplicativeExpression[?Yield, ?Await] MultiplicativeOperator ' +
      'ExponentiationExpression[?Yield, ?Await]',
    ['*', '/', '%'],
  );

  testBinaryExpression(
    'UpdateExpression[?Yield, ?Await] ** ExponentiationExpression[?Yield, ?Await]',
    '**',
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
