import { ContinueStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * BreakStatement[Yield, Await] :
 *   break ;
 *   break [no LineTerminator here] LabelIdentifier[?Yield, ?Await] ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ContinueStatement
 */
export const writeContinueStatement: Writer<ContinueStatement> = (
  node,
  write,
) => {
  write('continue');

  if (node.label) {
    write(node.label);
  }

  write(';');
};
