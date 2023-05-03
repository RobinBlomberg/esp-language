import { Identifier } from '../../esp-grammar/ast';
import { error, lex, match, Parser, TokenType } from '../../esp-lexer';

export const parseIdentifierName: Parser<Identifier> = (data, i) => {
  const node = lex(data, i);
  if (node.abrupt) return node;
  return match(node, [TokenType.Identifier, TokenType.Keyword])
    ? Identifier(node.start, node.end, node.value)
    : error(node);
};
