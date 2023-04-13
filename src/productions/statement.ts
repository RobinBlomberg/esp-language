import { Statement } from '../ast';
import { Parser } from '../token-utils';
import { parseBlockStatement } from './block-statement';
import { parseDoWhileStatement } from './do-while-statement';
import { parseExpressionStatement } from './expression-statement';
import { parseIfStatement } from './if-statement';
import { parseVariableDeclaration } from './variable-declaration';
import { parseWhileStatement } from './while-statement';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   BlockStatement
 *   DoWhileStatement
 *   ExpressionStatement
 *   IfStatement
 *   VariableDeclaration
 *   WhileStatement
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
    parseDoWhileStatement(data, i) ??
    parseIfStatement(data, i) ??
    parseVariableDeclaration(data, i) ??
    parseWhileStatement(data, i) ??
    parseExpressionStatement(data, i)
  );
};