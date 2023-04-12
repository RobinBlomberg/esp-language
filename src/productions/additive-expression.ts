import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseMultiplicativeExpression } from './multiplicative-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * AdditiveExpression[Yield, Await] :
 *   MultiplicativeExpression[?Yield, ?Await]
 *   AdditiveExpression[?Yield, ?Await] + MultiplicativeExpression[?Yield, ?Await]
 *   AdditiveExpression[?Yield, ?Await] - MultiplicativeExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AdditiveExpression
 */
export const parseAdditiveExpression =
  createLeftAssociativeBinaryExpressionParser(parseMultiplicativeExpression, {
    [TokenType.Punctuator]: ['+', '-'],
  });
