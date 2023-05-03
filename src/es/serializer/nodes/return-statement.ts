import { ReturnStatement } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ReturnStatement[Yield, Await] :
 *   return ;
 *   return [no LineTerminator here] Expression[+In, ?Yield, ?Await] ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ReturnStatement
 */
export const writeReturnStatement: Writer<ReturnStatement> = (node, write) => {
  write('return');

  if (node.argument) {
    write(node.argument);
  }

  write(';');
};
