import { lex } from '../lex';
import * as ast from '../node-factory';
import { IdentifierNode } from '../nodes';
import { match } from '../parse-utils';
import { TokenType as tt } from '../token-type';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * IdentifierName ::
 *   IdentifierStart
 *   IdentifierName IdentifierPart
 * ```
 */
export const parseIdentifierName = (
  data: string,
  start: number,
): IdentifierNode | null => {
  const node = lex(data, start);
  return match(node, tt.Name)
    ? ast.identifier(node.start, node.end, node.value)
    : null;
};
