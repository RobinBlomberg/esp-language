import { RestElement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * BindingRestElement[Yield, Await] :
 *   ... BindingIdentifier[?Yield, ?Await]
 *   ... BindingPattern[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-RestElement
 */
export const writeRestElement: Writer<RestElement> = (node, write) => {
  write('...');
  write(node.argument);
};
