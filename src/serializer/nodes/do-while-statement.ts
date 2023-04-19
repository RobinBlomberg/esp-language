import { DoWhileStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * DoWhileStatement[Yield, Await, Return] :
 *   do Statement[?Yield, ?Await, ?Return] while ( Expression[+In, ?Yield, ?Await] ) ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-DoWhileStatement
 */
export const writeDoWhileStatement: Writer<DoWhileStatement> = (
  node,
  write,
) => {
  write('do');
  write(node.body);
  write('while');
  write('(');
  write(node.test);
  write(')');
  write(';');
};
