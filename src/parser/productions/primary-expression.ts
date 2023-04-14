import { Parser } from '../../lexer';
import { Expression } from '../ast';
import { parseArrayLiteral } from './array-literal';
import { parseIdentifier } from './identifier';
import { parseLiteral } from './literal';
import { parseObjectLiteral } from './object-literal';
import { parseSetLiteral } from './set-literal';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * PrimaryExpression :
 *   Identifier
 *   Literal
 *   ArrayLiteral
 *   ObjectLiteral
 *   SetLiteral
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * PrimaryExpression :
 *   this
 *   FunctionExpression
 *   ClassExpression
 *   GeneratorExpression
 *   AsyncFunctionExpression
 *   AsyncGeneratorExpression
 *   RegularExpressionLiteral
 *   TemplateLiteral
 *   CoverParenthesizedExpressionAndArrowParameterList
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-PrimaryExpression
 */
export const parsePrimaryExpression: Parser<Expression> = (data, i) => {
  return (
    parseLiteral(data, i) ??
    parseIdentifier(data, i) ??
    parseArrayLiteral(data, i) ??
    parseObjectLiteral(data, i) ??
    parseSetLiteral(data, i)
  );
};
