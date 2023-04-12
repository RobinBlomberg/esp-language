import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseLogicalANDExpression } from './logical-and-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * LogicalORExpression :
 *   LogicalANDExpression
 *   LogicalORExpression || LogicalANDExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-LogicalORExpression
 */
export const parseLogicalORExpression =
  createLeftAssociativeBinaryExpressionParser(parseLogicalANDExpression, {
    [TokenType.Punctuator]: ['||'],
  });
