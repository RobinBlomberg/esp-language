import { Identifier } from '../ast';
import { reservedWords } from '../reserved-words';
import { Parser } from '../token-utils';
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
export const parseIdentifier: Parser<Identifier> = (data, i) => {
  const node = parseIdentifierName(data, i);
  return node && !reservedWords.has(node.name)
    ? Identifier(node.start, node.end, node.name)
    : null;
};
