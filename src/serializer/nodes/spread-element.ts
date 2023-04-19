import { SpreadElement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * SpreadElement[Yield, Await] :
 *   ... AssignmentExpression[+In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-SpreadElement
 */
export const writeSpreadElement: Writer<SpreadElement> = (node, write) => {
  write('...');
  write(node.argument);
};
