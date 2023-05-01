import { TokenType, abrupt, consume } from '../../../esp-lexer';
import { error, unused } from '../../../esp-lexer/abrupt';
import { parseExpressionList } from './expression-list';

export const parseArguments = (data: string, i: number) => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (abrupt(open)) return unused(open);
  i = open.end;

  const arguments_ = parseExpressionList(data, i);
  if (abrupt(arguments_)) return error(arguments_);
  i = arguments_.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (abrupt(close)) return error(close);

  return { end: close.end, arguments: arguments_.values };
};
