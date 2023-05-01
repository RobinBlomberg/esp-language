import { Parser, TokenType, abrupt, lex, match } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { Identifier } from '../ast';

export const parseIdentifierName: Parser<Identifier> = (data, i) => {
  const node = lex(data, i);
  if (abrupt(node)) return node;
  return match(node, [TokenType.Identifier, TokenType.Keyword])
    ? Identifier(node.start, node.end, node.value)
    : error(node);
};
