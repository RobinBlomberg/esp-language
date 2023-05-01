import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseBitwiseORExpression } from './bitwise-or-expression';

export const parseLogicalANDExpression =
  createLeftAssociativeBinaryExpressionParser(parseBitwiseORExpression, {
    [TokenType.Punctuator]: ['&&'],
  });
