import { Identifier } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * Identifier :
 *   IdentifierName but not ReservedWord
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Identifier
 */
export const writeIdentifier: Writer<Identifier> = (node, write) => {
  write(node.name);
};
