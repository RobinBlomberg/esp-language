import * as ast from '../node-factory';
import { Identifier } from '../nodes';
import { reservedWords } from '../reserved-words';
import { parseIdentifierName } from './identifier-name';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * Identifier :
 *   IdentifierName but not ReservedWord
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Identifier
 */
export const parseIdentifier = (
  data: string,
  start: number,
): Identifier | null => {
  const node = parseIdentifierName(data, start);
  return node && !reservedWords.has(node.name)
    ? ast.identifier(node.start, node.end, node.name)
    : null;
};
