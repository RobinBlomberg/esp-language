import { Identifier } from '../ast';
import { Parser } from '../parser-utils';
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
export const parseIdentifier: Parser<Identifier> = (data, start) => {
  const node = parseIdentifierName(data, start);
  return node && !reservedWords.has(node.name)
    ? Identifier(node.start, node.end, node.name)
    : null;
};
