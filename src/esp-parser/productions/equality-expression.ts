import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseRelationalExpression } from './relational-expression';

export const parseEqualityExpression =
  createLeftAssociativeBinaryExpressionParser(parseRelationalExpression, {
    [TokenType.Punctuator]: ['==', '!='],
  });
