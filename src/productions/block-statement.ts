import { BlockStatement, Statement } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseStatement } from './statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * BlockStatement :
 *   Block
 *
 * Block :
 *   { StatementList(opt) }
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
