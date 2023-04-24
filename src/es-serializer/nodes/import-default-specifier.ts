import { ImportDefaultSpecifier } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ImportedDefaultBinding :
 *   ImportedBinding
 *
 * ImportedBinding :
 *   BindingIdentifier[~Yield, +Await]
 *
 * BindingIdentifier[Yield, Await] :
 *   Identifier
 *   yield
 *   await
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ImportedDefaultBinding
 */
export const writeImportDefaultSpecifier: Writer<ImportDefaultSpecifier> = (
  node,
  write,
) => {
  write(node.local);
};
