import { BreakStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * BreakStatement[Yield, Await] :
 *   break ;
 *   break [no LineTerminator here] LabelIdentifier[?Yield, ?Await] ;
 * ```
 */
export const writeBreakStatement: Writer<BreakStatement> = (node, write) => {
  write('break');

  if (node.label) {
    write(node.label);
  }

  write(';');
};
