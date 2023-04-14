import { Statement } from '../ast';
import { Parser } from '../token-utils';
import { parseBlockStatement } from './block-statement';
import { parseBreakStatement } from './break-statement';
import { parseContinueStatement } from './continue-statement';
import { parseDoWhileStatement } from './do-while-statement';
import { parseExpressionStatement } from './expression-statement';
import { parseIfStatement } from './if-statement';
import { parseMatchStatement } from './match-statement';
import { parseReturnStatement } from './return-statement';
import { parseThrowStatement } from './throw-statement';
import { parseVariableDeclaration } from './variable-declaration';
import { parseWhileStatement } from './while-statement';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   BlockStatement
 *   BreakStatement
 *   ContinueStatement
 *   DoWhileStatement
 *   ExpressionStatement
 *   IfStatement
 *   MatchStatement
 *   ReturnStatement
 *   ThrowStatement
 *   VariableDeclaration
 *   WhileStatement
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * Statement :
 *   VariableStatement
 *   EmptyStatement
 *   WithStatement
 *   LabelledStatement
 *   TryStatement
 *   DebuggerStatement
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Statement
 */
export const parseStatement: Parser<Statement> = (data, i) => {
  return (
    parseBlockStatement(data, i) ??
    parseBreakStatement(data, i) ??
    parseContinueStatement(data, i) ??
    parseDoWhileStatement(data, i) ??
    parseIfStatement(data, i) ??
    parseMatchStatement(data, i) ??
    parseReturnStatement(data, i) ??
    parseThrowStatement(data, i) ??
    parseVariableDeclaration(data, i) ??
    parseWhileStatement(data, i) ??
    parseExpressionStatement(data, i)
  );
};
