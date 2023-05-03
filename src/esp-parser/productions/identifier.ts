import { error, lex, match, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';

export const parseIdentifier: Parser<IR.Identifier> = (data, i) => {
  const node = lex(data, i);
  if (node.abrupt) return node;
  return match(node, TokenType.Identifier)
    ? IR.Identifier(node.start, node.end, node.value)
    : error(node);
};
