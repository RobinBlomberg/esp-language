import { Statement } from '../ast';
import { Parser } from '../token-utils';
import { parseBlockStatement } from './block-statement';
import { parseExpressionStatement } from './expression-statement';
import { parseIfStatement } from './if-statement';
import { parseWhileStatement } from './while-statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   BlockStatement
 *   [partially] BreakableStatement
 *   ExpressionStatement
 *   IfStatement
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   VariableStatement
 *   EmptyStatement
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
  return (
    parseBlockStatement(data, i) ??
    parseIfStatement(data, i) ??
    parseWhileStatement(data, i) ??
    parseExpressionStatement(data, i)
  );
};
