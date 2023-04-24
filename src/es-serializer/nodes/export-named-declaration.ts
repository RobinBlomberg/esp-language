import { ExportNamedDeclaration } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ExportDeclaration :
 *   ...
 *   export NamedExports ;
 *   export VariableStatement[~Yield, +Await]
 *   export Declaration[~Yield, +Await]
 *   ...
 *
 * NamedExports :
 *   ...
 *   { ExportsList }
 *   ...
 *
 * ExportsList :
 *   ExportSpecifier
 *   ExportsList , ExportSpecifier
 *
 * ExportSpecifier :
 *   ModuleExportName
 *   ModuleExportName as ModuleExportName
 *
 * ModuleExportName :
 *   IdentifierName
 *   StringLiteral
 *
 * VariableStatement[Yield, Await] :
 *   var VariableDeclarationList[+In, ?Yield, ?Await] ;
 *
 * VariableDeclarationList[In, Yield, Await] :
 *   VariableDeclaration[?In, ?Yield, ?Await]
 *   VariableDeclarationList[?In, ?Yield, ?Await] , VariableDeclaration[?In, ?Yield, ?Await]
 *
 * VariableDeclaration[In, Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]<opt>
 *   BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
 * ```
 */
export const writeExportNamedDeclaration: Writer<ExportNamedDeclaration> = (
  node,
  write,
) => {
  write('export');

  if (node.declaration) {
    write(node.declaration);
  }

  if (node.specifiers.length >= 1) {
    write('{');

    for (let i = 0; i < node.specifiers.length; i++) {
      if (i >= 1) {
        write(',');
      }

      write(node.specifiers[i]!);
    }

    write('}');
    write(';');
  }
};
