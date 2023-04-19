import { WhileStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * WhileStatement[Yield, Await, Return] :
 *   while ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-WhileStatement
 */
export const writeWhileStatement: Writer<WhileStatement> = (node, write) => {
  write('while');
  write('(');
  write(node.test);
  write(')');
  write(node.body);
};
