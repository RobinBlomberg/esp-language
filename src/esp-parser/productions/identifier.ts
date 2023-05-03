import { Identifier } from '../../esp-grammar/ast';
import { error, lex, match, Parser, TokenType } from '../../esp-lexer';

export const parseIdentifier: Parser<Identifier> = (data, i) => {
  const node = lex(data, i);
  if (node.abrupt) return node;
  return match(node, TokenType.Identifier)
    ? Identifier(node.start, node.end, node.value)
    : error(node);
};
