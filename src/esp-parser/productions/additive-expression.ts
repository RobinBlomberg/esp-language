import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * AdditiveExpression :
 *   MultiplicativeExpression
 *   AdditiveExpression + MultiplicativeExpression
 *   AdditiveExpression - MultiplicativeExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AdditiveExpression
 */
export const parseAdditiveExpression =
  createLeftAssociativeBinaryExpressionParser(parseMultiplicativeExpression, {
    [TokenType.Punctuator]: ['+', '-'],
  });
