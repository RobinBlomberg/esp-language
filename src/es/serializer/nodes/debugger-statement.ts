import { DebuggerStatement } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * DebuggerStatement :
 *   debugger ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-DebuggerStatement
 */
export const writeDebuggerStatement: Writer<DebuggerStatement> = (
  node,
  write,
) => {
  write('debugger');
  write(';');
};
