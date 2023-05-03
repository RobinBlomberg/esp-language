import { Function } from '../../grammar';
import { consume, error, Parser, TokenType } from '../../lexer';
import { lookahead } from '../parser-utils';
import { parseBlockStatement } from './block-statement';
import { parseExpression } from './expression';
import { parseParameterList } from './internal/parameter-list';

export const parseFunction: Parser<Function> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, ':');
  if (open.abrupt) return open;
  i = open.end;

  const parameters = parseParameterList(data, i);
  if (parameters.abrupt) return error(parameters);
  i = parameters.end;

  const body =
    lookahead(data, i) === '{'
      ? parseBlockStatement(data, i)
      : parseExpression(data, i);
  if (body.abrupt) return error(body);

  return Function(open.start, body.end, parameters.parameters, body);
};
