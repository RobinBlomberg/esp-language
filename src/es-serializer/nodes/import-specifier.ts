import { ImportSpecifier } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ImportSpecifier :
 *   ImportedBinding
 *   ModuleExportName as ImportedBinding
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
 * @see https://tc39.es/ecma262/#prod-ImportSpecifier
 */
export const writeImportSpecifier: Writer<ImportSpecifier> = (node, write) => {
  write(node.imported);

  if (
    node.local.type !== node.imported.type ||
    node.local.name !== node.imported.name
  ) {
    write('as');
    write(node.local);
  }
};
