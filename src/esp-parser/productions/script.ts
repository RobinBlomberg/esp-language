import { Parser, isAbrupt } from '../../esp-lexer';
import { Script, Statement } from '../ast';
import { parseStatement } from './statement';

export const parseScript: Parser<Script> = (data, i) => {
  const body: Statement[] = [];

  while (true) {
    const statement = parseStatement(data, i);
    if (isAbrupt(statement)) {
      return statement.type === 'Error'
        ? statement
        : Script(body[0]?.start ?? 0, body[body.length - 1]?.end ?? 0, body);
    }

    body.push(statement);
    i = statement.end;
  }
};
