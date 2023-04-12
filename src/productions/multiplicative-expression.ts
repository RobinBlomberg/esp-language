import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseExponentiationExpression } from './exponentiation-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * MultiplicativeExpression :
 *   ExponentiationExpression
 *   MultiplicativeExpression MultiplicativeOperator
 *     ExponentiationExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MultiplicativeExpression
 */
export const parseMultiplicativeExpression =
  createLeftAssociativeBinaryExpressionParser(parseExponentiationExpression, {
    [TokenType.Punctuator]: ['*', '/', '%'],
  });
