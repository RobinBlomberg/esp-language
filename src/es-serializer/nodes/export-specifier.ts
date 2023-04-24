import { ExportSpecifier, NodeType } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ExportSpecifier :
 *   ModuleExportName
 *   ModuleExportName as ModuleExportName
 *
 * ModuleExportName :
 *   IdentifierName
 *   StringLiteral
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ExportSpecifier
 */
export const writeExportSpecifier: Writer<ExportSpecifier> = (node, write) => {
  write(node.local);

  const local =
    node.local.type === NodeType.Literal ? node.local.value : node.local.name;
  const exported =
    node.exported.type === NodeType.Literal
      ? node.exported.value
      : node.exported.name;

  if (local !== exported) {
    write('as');
    write(node.exported);
  }
};
