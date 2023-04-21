import { PrivateIdentifier } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * PrivateIdentifier ::
 *   # IdentifierName
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-PrivateIdentifier
 */
export const writePrivateIdentifier: Writer<PrivateIdentifier> = (
  node,
  write,
) => {
  write('#');
  write(node.name);
};
