import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { Function } from '../ast';
import { lookahead } from '../parser-utils';
import { parseBlockStatement } from './block-statement';
import { parseExpression } from './expression';
import { parseParameterList } from './internal/parameter-list';

export const parseFunction: Parser<Function> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, ':');
  if (isAbrupt(open)) return open;
  i = open.end;

  const parameters = parseParameterList(data, i);
  if (isAbrupt(parameters)) return error(parameters);
  i = parameters.end;

  const body =
    lookahead(data, i) === '{'
      ? parseBlockStatement(data, i)
      : parseExpression(data, i);
  if (isAbrupt(body)) return error(body);

  return Function(open.start, body.end, parameters.parameters, body);
};
