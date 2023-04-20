import { IfStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * IfStatement[Yield, Await, Return] :
 *   if ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return] else
 *     Statement[?Yield, ?Await, ?Return]
 *   if ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return] [lookahead ≠ else]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-IfStatement
 */
export const writeIfStatement: Writer<IfStatement> = (node, write) => {
  write('if');
  write('(');
  write(node.test);
  write(')');
  write(node.consequent);

  if (node.alternate) {
    write('else');
    write(node.alternate);
  }
};
