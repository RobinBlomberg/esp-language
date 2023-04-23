import { WithStatement } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * WithStatement[Yield, Await, Return] :
 *   with ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-WithStatement
 */
export const writeWithStatement: Writer<WithStatement> = (node, write) => {
  write('with');
  write('(');
  write(node.object);
  write(')');
  write(node.body);
};
