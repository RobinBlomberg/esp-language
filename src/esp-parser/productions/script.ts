import { Script, Statement } from '../../esp-grammar/ast';
import { Parser } from '../../esp-lexer';
import { parseStatement } from './statement';

export const parseScript: Parser<Script> = (data, i) => {
  const body: Statement[] = [];

  while (true) {
    const statement = parseStatement(data, i);
    if (statement.abrupt) {
      return statement.abrupt === 'Error'
        ? statement
        : Script(body[0]?.start ?? 0, body[body.length - 1]?.end ?? 0, body);
    }

    body.push(statement);
    i = statement.end;
  }
};
