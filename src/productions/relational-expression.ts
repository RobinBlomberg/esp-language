import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
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
 *   RelationalExpression instanceof ShiftExpression
 *   RelationalExpression in ShiftExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * RelationalExpression :
 *   PrivateIdentifier in ShiftExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-RelationalExpression
 */
export const parseRelationalExpression =
  createLeftAssociativeBinaryExpressionParser(parseShiftExpression, {
    [TokenType.Name]: ['instanceof', 'in'],
    [TokenType.Punctuator]: ['<', '>', '<=', '>='],
  });
