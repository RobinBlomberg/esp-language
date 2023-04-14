import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseBitwiseORExpression } from './bitwise-or-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * LogicalANDExpression :
 *   BitwiseORExpression
 *   LogicalANDExpression && BitwiseORExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-LogicalANDExpression
 */
export const parseLogicalANDExpression =
  createLeftAssociativeBinaryExpressionParser(parseBitwiseORExpression, {
    [TokenType.Punctuator]: ['&&'],
  });
