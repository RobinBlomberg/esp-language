import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseAdditiveExpression } from './additive-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ShiftExpression[Yield, Await] :
 *   AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] << AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] >> AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] >>> AdditiveExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ShiftExpression
 */
export const parseShiftExpression = createLeftAssociativeBinaryExpressionParser(
  parseAdditiveExpression,
  { [TokenType.Punctuator]: ['<<', '>>', '>>>'] },
);
