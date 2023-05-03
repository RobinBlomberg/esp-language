import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseShiftExpression } from './shift-expression';

export const parseRelationalExpression =
  createLeftAssociativeBinaryExpressionParser(parseShiftExpression, {
    [TokenType.Punctuator]: ['<', '>', '<=', '>='],
  });
