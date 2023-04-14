import { TokenType } from '../../lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseShiftExpression } from './shift-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * RelationalExpression :
 *   ShiftExpression
 *   RelationalExpression < ShiftExpression
 *   RelationalExpression > ShiftExpression
 *   RelationalExpression <= ShiftExpression
 *   RelationalExpression >= ShiftExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * RelationalExpression :
 *   RelationalExpression instanceof ShiftExpression
 *   RelationalExpression in ShiftExpression
 *   PrivateIdentifier in ShiftExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-RelationalExpression
 */
export const parseRelationalExpression =
  createLeftAssociativeBinaryExpressionParser(parseShiftExpression, {
    [TokenType.Punctuator]: ['<', '>', '<=', '>='],
  });
