import { Statement } from '../ast';
import { Parser } from '../token-utils';
import { parseBlockStatement } from './block-statement';
import { parseExpressionStatement } from './expression-statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   BlockStatement
 *   ExpressionStatement
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   VariableStatement
 *   EmptyStatement
 *   IfStatement
 *   BreakableStatement
 *   ContinueStatement
 *   BreakStatement
 *   ReturnStatement
 *   WithStatement
 *   LabelledStatement
 *   ThrowStatement
 *   TryStatement
 *   DebuggerStatement
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Statement
 */
export const parseStatement: Parser<Statement> = (data, i) => {
  return parseBlockStatement(data, i) ?? parseExpressionStatement(data, i);
};
