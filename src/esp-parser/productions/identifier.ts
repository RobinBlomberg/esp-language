import { error, lex, match, Parser, TokenType } from '../../esp-lexer';
import { Identifier } from '../ast';

export const parseIdentifier: Parser<Identifier> = (data, i) => {
  const node = lex(data, i);
  if (node.abrupt) return node;
  return match(node, TokenType.Identifier)
    ? Identifier(node.start, node.end, node.value)
    : error(node);
};
