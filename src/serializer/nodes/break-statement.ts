import { BreakStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * BreakStatement[Yield, Await] :
 *   break ;
 *   break [no LineTerminator here] LabelIdentifier[?Yield, ?Await] ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BreakStatement
 */
export const writeBreakStatement: Writer<BreakStatement> = (node, write) => {
  write('break');

  if (node.label) {
    write(node.label);
  }

  write(';');
};
