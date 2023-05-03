import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseBitwiseXORExpression } from './bitwise-xor-expression';

export const parseBitwiseORExpression =
  createLeftAssociativeBinaryExpressionParser(parseBitwiseXORExpression, {
    [TokenType.Punctuator]: ['|'],
  });
