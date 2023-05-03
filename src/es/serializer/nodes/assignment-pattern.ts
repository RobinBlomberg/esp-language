import { AssignmentPattern } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * BindingElement[Yield, Await] :
 *   SingleNameBinding[?Yield, ?Await]
 *   BindingPattern[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>
 *
 * SingleNameBinding[Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BindingPattern
 */
export const writeAssignmentPattern: Writer<AssignmentPattern> = (
  node,
  write,
) => {
  write(node.left);
  write('=');
  write(node.right);
};
