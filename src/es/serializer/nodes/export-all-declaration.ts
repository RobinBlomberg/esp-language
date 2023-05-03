import { ExportAllDeclaration } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ExportDeclaration :
 *   export ExportFromClause FromClause ;
 *   ...
 *
 * ExportFromClause :
 *   *
 *   * as ModuleExportName
 *   ...
 *
 * ModuleExportName :
 *   IdentifierName
 *   StringLiteral
 *
 * FromClause :
 *   from ModuleSpecifier
 *
 * ModuleSpecifier :
 *   StringLiteral
 * ```
 */
export const writeExportAllDeclaration: Writer<ExportAllDeclaration> = (
  node,
  write,
) => {
  write('export');
  write('*');

  if (node.exported) {
    write('as');
    write(node.exported);
  }

  write('from');
  write(node.source);
  write(';');
};
