import { Parser, lex } from '../../esp-lexer';
import { Script, Statement } from '../ast';
import { parseStatement } from './statement';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * BlockStatement :
 *   { StatementList<opt> }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Script
 */
export const parseScript: Parser<Script> = (data, i) => {
  const body: Statement[] = [];

  while (true) {
    if (!lex(data, i)) {
      return Script(body[0]?.start ?? 0, body[body.length - 1]?.end ?? 0, body);
    }

    const statement = parseStatement(data, i);
    if (!statement) return null;

    body.push(statement);
    i = statement.end;
  }
};
