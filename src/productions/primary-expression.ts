import { Expression } from '../nodes';
import { Parser } from '../parser-utils';
import { parseIdentifier } from './identifier';
import { parseLiteral } from './literal';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * PrimaryExpression[Yield, Await] :
 *   IdentifierReference[?Yield, ?Await]
 *   Literal
 *   ArrayLiteral[?Yield, ?Await]
 *   ObjectLiteral[?Yield, ?Await]
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * PrimaryExpression[Yield, Await] :
 *   this
 *   FunctionExpression
 *   ClassExpression[?Yield, ?Await]
 *   GeneratorExpression
 *   AsyncFunctionExpression
 *   AsyncGeneratorExpression
 *   RegularExpressionLiteral
 *   TemplateLiteral[?Yield, ?Await, ~Tagged]
 *   CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-PrimaryExpression
 */
export const parsePrimaryExpression: Parser<Expression> = (data, start) => {
  return parseLiteral(data, start) ?? parseIdentifier(data, start);
};
