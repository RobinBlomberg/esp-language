import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseStatement } from './statement';

export const parseBlockStatement: Parser<IR.BlockStatement> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (open.abrupt) return open;
  i = open.end;

  const body: IR.Statement[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (!close.abrupt) {
      return IR.BlockStatement(open.start, close.end, body);
    }

    const statement = parseStatement(data, i);
    if (statement.abrupt) return error(statement);

    body.push(statement);
    i = statement.end;
  }
};
