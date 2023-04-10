import { Arguments, Expression } from '../ast';
import { Parser, consume } from '../parser-utils';
import { parseExpression } from './expression';
import { TokenType as tt } from '../token-type';

export const parseArguments: Parser<Arguments> = (data, start) => {
  let i = start;

  const open = consume(data, i, tt.Punctuator, '(');
  if (open) i = open.end;
  else return null;

  const arguments_: Expression[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, ')');
    if (close) {
      return Arguments(open.start, close.end, arguments_);
    }

    if (arguments_.length >= 1) {
      const comma = consume(data, i, tt.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const element = parseExpression(data, i);
    if (element) i = element.end;
    else return null;

    arguments_.push(element);
  }
};
