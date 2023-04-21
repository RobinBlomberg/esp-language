import { ContinueStatement } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ContinueStatement[Yield, Await] :
 *   continue ;
 *   continue [no LineTerminator here] LabelIdentifier[?Yield, ?Await] ;
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
