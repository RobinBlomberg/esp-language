import { TryStatement } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * TryStatement[Yield, Await, Return] :
 *   try Block[?Yield, ?Await, ?Return] Catch[?Yield, ?Await, ?Return]
 *   try Block[?Yield, ?Await, ?Return] Finally[?Yield, ?Await, ?Return]
 *   try Block[?Yield, ?Await, ?Return] Catch[?Yield, ?Await, ?Return]
 *     Finally[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-TryStatement
 */
export const writeTryStatement: Writer<TryStatement> = (node, write) => {
  write('try');
  write(node.block);

  if (node.handler) {
    write(node.handler);
  }

  if (node.finalizer) {
    write('finally');
    write(node.finalizer);
  }
};
