import { Parser } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseStatement } from './statement';

export const parseScript: Parser<IR.Script> = (data, i) => {
  const body: IR.Statement[] = [];

  while (true) {
    const statement = parseStatement(data, i);
    if (statement.abrupt) {
      return statement.abrupt === 'Error'
        ? statement
        : IR.Script(body[0]?.start ?? 0, body[body.length - 1]?.end ?? 0, body);
    }

    body.push(statement);
    i = statement.end;
  }
};
