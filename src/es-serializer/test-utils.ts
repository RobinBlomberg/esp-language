import { expect, suite, test } from 'vitest';
import {
  BinaryExpression,
  BinaryOperator,
  Identifier,
  PrivateIdentifier,
} from '../es-ast';
import { serialize } from './serialize';

export const testBinaryExpression = (
  name: string,
  operatorInput: BinaryOperator | BinaryOperator[],
  privateIdentifier = false,
) => {
  if (Array.isArray(operatorInput)) {
    suite(name, () => {
      for (const operator of operatorInput) {
        test(name, () => {
          expect(
            serialize(
              BinaryExpression(operator, Identifier('a'), Identifier('b')),
            ),
          ).toBe(`a${operator}b`);
        });
      }
    });
  } else {
    const space = /[a-z]/.test(operatorInput) ? ' ' : '';

    test(name, () => {
      expect(
        serialize(
          BinaryExpression(
            operatorInput,
            privateIdentifier ? PrivateIdentifier('a') : Identifier('a'),
            Identifier('b'),
          ),
        ),
      ).toBe(
        `${privateIdentifier ? '#' : ''}a${space}${operatorInput}${space}b`,
      );
    });
  }
};
