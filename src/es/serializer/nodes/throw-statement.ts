import { ThrowStatement } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ThrowStatement[Yield, Await] :
 *   throw [no LineTerminator here] Expression[+In, ?Yield, ?Await] ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ThrowStatement
 */
export const writeThrowStatement: Writer<ThrowStatement> = (node, write) => {
  write('throw');
  write(node.argument);
  write(';');
};
