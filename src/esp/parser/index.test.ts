import { expect, suite, test } from 'vitest';
import {
  BinaryExpression,
  BinaryOperator,
  BooleanLiteral,
  Identifier,
  IdentifierName,
  Invalid,
  Node,
  NumberLiteral,
  StringLiteral,
  UnaryExpression,
  UnaryOperator,
} from './nodes';
import {
  parseBinaryExpression,
  parseBinaryOperator,
  parseBooleanLiteral,
  parseIdentifier,
  parseIdentifierName,
  parseNumberLiteral,
  parseStringLiteral,
  parseUnaryExpression,
  parseUnaryOperator,
} from './parser';

const createTest = <V extends Node>(parse: (data: string, s: number) => V) => {
  return (data: string, v: V) => {
    expect(parse(data, 0)).toStrictEqual(v);
  };
};

const is = {
  binaryOperator: createTest(parseBinaryOperator),
  identifierName: createTest(parseIdentifierName),
  numberLiteral: createTest(parseNumberLiteral),
  stringLiteral: createTest(parseStringLiteral),
  unaryOperator: createTest(parseUnaryOperator),
  booleanLiteral: createTest(parseBooleanLiteral),
  identifier: createTest(parseIdentifier),
  unaryExpression: createTest(parseUnaryExpression),
  binaryExpression: createTest(parseBinaryExpression),
};

suite('parser', () => {
  test('BinaryOperator', () => {
    is.binaryOperator('¤', Invalid());
    is.binaryOperator('+', BinaryOperator(0, 1, '+'));
    is.binaryOperator('-', BinaryOperator(0, 1, '-'));
  });

  test('IdentifierName', () => {
    is.identifierName('¤', Invalid());
    is.identifierName('a', IdentifierName(0, 1, 'a'));
    is.identifierName('ab', IdentifierName(0, 2, 'ab'));
  });

  test('NumberLiteral', () => {
    is.numberLiteral('¤', Invalid());
    is.numberLiteral('0', NumberLiteral(0, 1, 0));
    is.numberLiteral('01', NumberLiteral(0, 1, 0));
    is.numberLiteral('1', NumberLiteral(0, 1, 1));
    is.numberLiteral('987', NumberLiteral(0, 3, 987));
    is.numberLiteral('0.12', NumberLiteral(0, 4, 0.12));
  });

  test('StringLiteral', () => {
    is.stringLiteral('¤', Invalid());
    is.stringLiteral("'\\", Invalid());
    is.stringLiteral("'", Invalid());
    is.stringLiteral("''", StringLiteral(0, 2, ''));
    is.stringLiteral("'ab'", StringLiteral(0, 4, 'ab'));
    is.stringLiteral("'a\\'b'", StringLiteral(0, 6, "a'b"));
  });

  test('UnaryOperator', () => {
    is.unaryOperator('¤', Invalid());
    is.unaryOperator('-', UnaryOperator(0, 1, '-'));
  });

  test('BooleanLiteral', () => {
    is.booleanLiteral('truex', Invalid());
    is.booleanLiteral('true', BooleanLiteral(0, 4, true));
    is.booleanLiteral('false', BooleanLiteral(0, 5, false));
  });

  test('Identifier', () => {
    is.identifier('a', Identifier(0, 1, 'a'));
    is.identifier('ab', Identifier(0, 2, 'ab'));
  });

  test('UnaryExpression', () => {
    is.unaryExpression('a', Identifier(0, 1, 'a'));
    is.unaryExpression(
      '-a',
      UnaryExpression(0, 2, UnaryOperator(0, 1, '-'), Identifier(1, 2, 'a')),
    );
  });

  test('BinaryExpression', () => {
    is.binaryExpression('a', Identifier(0, 1, 'a'));
    is.binaryExpression(
      'a+b',
      BinaryExpression(
        0,
        3,
        Identifier(0, 1, 'a'),
        BinaryOperator(1, 2, '+'),
        Identifier(2, 3, 'b'),
      ),
    );
  });
});
