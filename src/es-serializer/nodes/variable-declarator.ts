import { VariableDeclarator } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * VariableDeclaration[In, Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]<opt>
 *   BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-VariableDeclaration
 */
export const writeVariableDeclarator: Writer<VariableDeclarator> = (
  node,
  write,
) => {
  write(node.id);

  if (node.init) {
    write('=');
    write(node.init);
  }
};
