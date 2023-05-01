import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

export const parseMultiplicativeExpression =
  createLeftAssociativeBinaryExpressionParser(parseExponentiationExpression, {
    [TokenType.Punctuator]: ['*', '/', '%'],
  });
