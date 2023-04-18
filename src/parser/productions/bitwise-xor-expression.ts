import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseBitwiseANDExpression } from './bitwise-and-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * BitwiseXORExpression :
 *   BitwiseANDExpression
 *   BitwiseXORExpression ^ BitwiseANDExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BitwiseXORExpression
 */
export const parseBitwiseXORExpression =
  createLeftAssociativeBinaryExpressionParser(parseBitwiseANDExpression, {
    [TokenType.Punctuator]: ['^'],
  });