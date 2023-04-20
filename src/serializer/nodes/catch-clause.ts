import { CatchClause } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * Catch[Yield, Await, Return] :
 *   catch ( CatchParameter[?Yield, ?Await] ) Block[?Yield, ?Await, ?Return]
 *   catch Block[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Catch
 */
export const writeCatchClause: Writer<CatchClause> = (node, write) => {
  write('catch');

  if (node.param) {
    write('(');
    write(node.param);
    write(')');
  }

  write(node.body);
};
