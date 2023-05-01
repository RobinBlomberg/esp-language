import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseBitwiseANDExpression } from './bitwise-and-expression';

export const parseBitwiseXORExpression =
  createLeftAssociativeBinaryExpressionParser(parseBitwiseANDExpression, {
    [TokenType.Punctuator]: ['^'],
  });
