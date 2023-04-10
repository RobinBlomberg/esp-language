import { Identifier } from '../ast';
import { lex } from '../lex';
import { TokenType } from '../token-type';
import { Parser, match } from '../token-utils';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * IdentifierName ::
 *   IdentifierStart
 *   IdentifierName IdentifierPart
 * ```
 */
export const parseIdentifierName: Parser<Identifier> = (data, start) => {
  const node = lex(data, start);
  return match(node, TokenType.Name)
    ? Identifier(node.start, node.end, node.value)
    : null;
};
