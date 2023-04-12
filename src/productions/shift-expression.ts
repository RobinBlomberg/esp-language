import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseAdditiveExpression } from './additive-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ShiftExpression :
 *   AdditiveExpression
 *   ShiftExpression << AdditiveExpression
 *   ShiftExpression >> AdditiveExpression
 *   ShiftExpression >>> AdditiveExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ShiftExpression
 */
export const parseShiftExpression = createLeftAssociativeBinaryExpressionParser(
  parseAdditiveExpression,
  { [TokenType.Punctuator]: ['<<', '>>', '>>>'] },
);
