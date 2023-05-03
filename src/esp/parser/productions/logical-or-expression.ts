import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseLogicalANDExpression } from './logical-and-expression';

export const parseLogicalORExpression =
  createLeftAssociativeBinaryExpressionParser(parseLogicalANDExpression, {
    [TokenType.Punctuator]: ['||'],
  });
