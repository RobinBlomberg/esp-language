import { Expression, NonAbrupt } from '../../../grammar';
import { Abrupt, TokenType, consume, error, unused } from '../../../lexer';
import { parseExpressionList } from './expression-list';

export const parseArguments = (
  data: string,
  i: number,
): NonAbrupt<{ end: number; arguments: Expression[] }> | Abrupt => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return unused(open);
  i = open.end;

  const arguments_ = parseExpressionList(data, i);
  if (arguments_.abrupt) return error(arguments_);
  i = arguments_.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (close.abrupt) return error(close);

  return { end: close.end, arguments: arguments_.values };
};
