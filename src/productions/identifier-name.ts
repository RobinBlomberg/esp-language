import { lex } from '../lex';
import * as ast from '../node-factory';
import { Identifier } from '../nodes';
import { Parser, match } from '../parser-utils';
import { TokenType as tt } from '../token-type';

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
  return match(node, tt.Name)
    ? ast.identifier(node.start, node.end, node.value)
    : null;
};
