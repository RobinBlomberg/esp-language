import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { lookahead } from '../parser-utils';
import { parseBlockStatement } from './block-statement';
import { parseExpression } from './expression';
import { parseParameterList } from './internal/parameter-list';

export const parseFunction: Parser<IR.Function> = (data, i) => {
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

  return IR.Function(open.start, body.end, parameters.parameters, body);
};
