import { Parser, abrupt, lex } from '../../esp-lexer';
import { Statement } from '../ast';
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
  const token = lex(data, i);
  if (abrupt(token)) return token;

  switch (token.value) {
    case '{':
      return parseBlockStatement(data, i);
    case 'break':
      return parseBreakStatement(data, i);
    case 'continue':
      return parseContinueStatement(data, i);
    case 'do':
      return parseDoWhileStatement(data, i);
    case 'if':
      return parseIfStatement(data, i);
    case 'let':
      return parseVariableDeclaration(data, i);
    case 'match':
      return parseMatchStatement(data, i);
    case 'return':
      return parseReturnStatement(data, i);
    case 'throw':
      return parseThrowStatement(data, i);
    case 'while':
      return parseWhileStatement(data, i);
    default:
      return parseExpressionStatement(data, i);
  }
};
