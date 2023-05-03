import { ImportDeclaration, NodeType } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ImportDeclaration :
 *   import ImportClause FromClause ;
 *   import ModuleSpecifier ;
 *
 * ImportClause :
 *   ImportedDefaultBinding
 *   NameSpaceImport
 *   NamedImports
 *   ImportedDefaultBinding , NameSpaceImport
 *   ImportedDefaultBinding , NamedImports
 *
 * ImportedDefaultBinding :
 *   ImportedBinding
 *
 * NameSpaceImport :
 *   * as ImportedBinding
 *
 * NamedImports :
 *   ...
 *   { ImportsList }
 *   ...
 *
 * FromClause :
 *   from ModuleSpecifier
 *
 * ImportsList :
 *   ImportSpecifier
 *   ImportsList , ImportSpecifier
 *
 * ModuleSpecifier :
 *   StringLiteral
 *
 * ImportedBinding :
 *   BindingIdentifier[~Yield, +Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ImportDeclaration
 */
export const writeImportDeclaration: Writer<ImportDeclaration> = (
  node,
  write,
) => {
  write('import');

  if (node.specifiers.length >= 1) {
    let hasImportSpecifierBeenWritten = false;

    for (let i = 0; i < node.specifiers.length; i++) {
      if (i >= 1) {
        write(',');
      }

      const specifier = node.specifiers[i]!;

      if (
        specifier.type === NodeType.ImportSpecifier &&
        !hasImportSpecifierBeenWritten
      ) {
        write('{');
        hasImportSpecifierBeenWritten = true;
      }

      write(specifier);
    }

    if (hasImportSpecifierBeenWritten) {
      write('}');
    }

    write('from');
  }

  write(node.source);
  write(';');
};
