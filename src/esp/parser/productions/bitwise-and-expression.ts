import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseEqualityExpression } from './equality-expression';

export const parseBitwiseANDExpression =
  createLeftAssociativeBinaryExpressionParser(parseEqualityExpression, {
    [TokenType.Punctuator]: ['&'],
  });
