import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseRelationalExpression } from './relational-expression';

export const parseEqualityExpression =
  createLeftAssociativeBinaryExpressionParser(parseRelationalExpression, {
    [TokenType.Punctuator]: ['==', '!='],
  });
