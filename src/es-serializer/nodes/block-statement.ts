import { BlockStatement } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * BlockStatement[Yield, Await, Return] :
 *   Block[?Yield, ?Await, ?Return]
 *
 * Block[Yield, Await, Return] :
 *   { StatementList[?Yield, ?Await, ?Return]<opt> }
 *
 * StatementList[Yield, Await, Return] :
 *   StatementListItem[?Yield, ?Await, ?Return]
 *   StatementList[?Yield, ?Await, ?Return] StatementListItem[?Yield, ?Await, ?Return]
 *
 * StatementListItem[Yield, Await, Return] :
 *   Statement[?Yield, ?Await, ?Return]
 *   Declaration[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BlockStatement
 */
export const writeBlockStatement: Writer<BlockStatement> = (node, write) => {
  write('{');

  for (const statement of node.body) {
    write(statement);
  }

  write('}');
};
