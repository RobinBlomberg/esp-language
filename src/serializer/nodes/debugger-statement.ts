import { DebuggerStatement } from '../../estree';
import { Writer } from '../write';

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
