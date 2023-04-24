import { ImportNamespaceSpecifier } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * NameSpaceImport :
 *   * as ImportedBinding
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-NameSpaceImport
 */
export const writeImportNamespaceSpecifier: Writer<ImportNamespaceSpecifier> = (
  node,
  write,
) => {
  write('*');
  write('as');
  write(node.local);
};
