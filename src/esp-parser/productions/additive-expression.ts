import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

export const parseAdditiveExpression =
  createLeftAssociativeBinaryExpressionParser(parseMultiplicativeExpression, {
    [TokenType.Punctuator]: ['+', '-'],
  });
