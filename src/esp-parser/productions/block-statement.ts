import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { BlockStatement, Statement } from '../ast';
import { parseStatement } from './statement';

export const parseBlockStatement: Parser<BlockStatement> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (isAbrupt(open)) return open;
  i = open.end;

  const body: Statement[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (!isAbrupt(close)) {
      return BlockStatement(open.start, close.end, body);
    }

    const statement = parseStatement(data, i);
    if (isAbrupt(statement)) return error(statement);

    body.push(statement);
    i = statement.end;
  }
};
