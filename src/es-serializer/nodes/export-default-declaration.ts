import { ExportDefaultDeclaration, NodeType } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ExportDeclaration :
 *   ...
 *   export default HoistableDeclaration[~Yield, +Await, +Default]
 *   export default ClassDeclaration[~Yield, +Await, +Default]
 *   export default [lookahead ∉ { function, async [no LineTerminator here] function, class }]
 *     AssignmentExpression[+In, ~Yield, +Await] ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ExportDeclaration
 */
export const writeExportDefaultDeclaration: Writer<ExportDefaultDeclaration> = (
  node,
  write,
) => {
  write('export');
  write('default');
  write(node.declaration);

  if (
    node.declaration.type !== NodeType.FunctionDeclaration &&
    node.declaration.type !== NodeType.ClassDeclaration
  ) {
    write(';');
  }
};
