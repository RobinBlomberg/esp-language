import { error, lex, match, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';

export const parseIdentifierName: Parser<IR.Identifier> = (data, i) => {
  const node = lex(data, i);
  if (node.abrupt) return node;
  return match(node, [TokenType.Identifier, TokenType.Keyword])
    ? IR.Identifier(node.start, node.end, node.value)
    : error(node);
};
