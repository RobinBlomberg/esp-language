import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseExponentiationExpression } from './exponentiation-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * MultiplicativeExpression[Yield, Await] :
 *   ExponentiationExpression[?Yield, ?Await]
 *   MultiplicativeExpression[?Yield, ?Await] MultiplicativeOperator
 *     ExponentiationExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MultiplicativeExpression
 */
export const parseMultiplicativeExpression =
  createLeftAssociativeBinaryExpressionParser(parseExponentiationExpression, {
    [TokenType.Punctuator]: ['*', '/', '%'],
  });
