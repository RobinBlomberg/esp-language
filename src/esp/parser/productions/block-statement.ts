import { BlockStatement, Statement } from '../../grammar';
import { Parser, TokenType, consume, error } from '../../lexer';
import { parseStatement } from './statement';

export const parseBlockStatement: Parser<BlockStatement> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (open.abrupt) return open;
  i = open.end;

  const body: Statement[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (!close.abrupt) {
      return BlockStatement(open.start, close.end, body);
    }

    const statement = parseStatement(data, i);
    if (statement.abrupt) return error(statement);

    body.push(statement);
    i = statement.end;
  }
};
