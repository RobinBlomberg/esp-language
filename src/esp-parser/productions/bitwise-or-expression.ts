import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseBitwiseXORExpression } from './bitwise-xor-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * BitwiseORExpression :
 *   BitwiseXORExpression
 *   BitwiseORExpression | BitwiseXORExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BitwiseORExpression
 */
export const parseBitwiseORExpression =
  createLeftAssociativeBinaryExpressionParser(parseBitwiseXORExpression, {
    [TokenType.Punctuator]: ['|'],
  });
