import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseRelationalExpression } from './relational-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * EqualityExpression :
 *   RelationalExpression
 *   EqualityExpression == RelationalExpression
 *   EqualityExpression != RelationalExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 *   EqualityExpression === RelationalExpression
 *   EqualityExpression !== RelationalExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-EqualityExpression
 */
export const parseEqualityExpression =
  createLeftAssociativeBinaryExpressionParser(parseRelationalExpression, {
    [TokenType.Punctuator]: ['==', '!='],
  });
