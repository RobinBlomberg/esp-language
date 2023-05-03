import { StaticBlock } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ClassStaticBlock :
 *   static { ClassStaticBlockBody }
 *
 * ClassStaticBlockBody :
 *   ClassStaticBlockStatementList
 *
 * ClassStaticBlockStatementList :
 *   StatementList[~Yield, +Await, ~Return]<opt>
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
 * @see https://tc39.es/ecma262/#prod-ClassStaticBlock
 */
export const writeStaticBlock: Writer<StaticBlock> = (node, write) => {
  write('static');
  write('{');

  for (const statement of node.body) {
    write(statement);
  }

  write('}');
};
