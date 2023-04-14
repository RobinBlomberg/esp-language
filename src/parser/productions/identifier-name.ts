import { Parser, TokenType, lex, match } from '../../lexer';
import { Identifier } from '../ast';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * IdentifierName ::
 *   IdentifierStart
 *   IdentifierName IdentifierPart
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-IdentifierName
 */
export const parseIdentifierName: Parser<Identifier> = (data, i) => {
  const node = lex(data, i);
  return match(node, [TokenType.Identifier, TokenType.Keyword])
    ? Identifier(node.start, node.end, node.value)
    : null;
};
