import { ImportExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ImportCall[Yield, Await] :
 *   import ( AssignmentExpression[+In, ?Yield, ?Await] )
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ImportCall
 */
export const writeImportExpression: Writer<ImportExpression> = (
  node,
  write,
) => {
  write('import');
  write('(');
  write(node.source);
  write(')');
};
