import { Parser, TokenType, consume } from '../../lexer';
import { BlockStatement, Statement } from '../ast';
import { parseStatement } from './statement';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * BlockStatement :
 *   { StatementList<opt> }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BlockStatement
 */
export const parseBlockStatement: Parser<BlockStatement> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (open) i = open.end;
  else return null;

  const body: Statement[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (close) {
      return BlockStatement(open.start, close.end, body);
    }

    const statement = parseStatement(data, i);
    if (!statement) return null;

    body.push(statement);
    i = statement.end;
  }
};
