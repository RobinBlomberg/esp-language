import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
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
  if (abrupt(open)) return open;
  i = open.end;

  const body: Statement[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (!abrupt(close)) {
      return BlockStatement(open.start, close.end, body);
    }

    const statement = parseStatement(data, i);
    if (abrupt(statement)) return error(statement);

    body.push(statement);
    i = statement.end;
  }
};
