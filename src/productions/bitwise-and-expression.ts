import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseEqualityExpression } from './equality-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * BitwiseANDExpression :
 *   EqualityExpression
 *   BitwiseANDExpression & EqualityExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BitwiseANDExpression
 */
export const parseBitwiseANDExpression =
  createLeftAssociativeBinaryExpressionParser(parseEqualityExpression, {
    [TokenType.Punctuator]: ['&'],
  });
