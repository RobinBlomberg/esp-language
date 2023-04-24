import { SwitchCase } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * CaseClause[Yield, Await, Return] :
 *   case Expression[+In, ?Yield, ?Await] : StatementList[?Yield, ?Await, ?Return]<opt>
 *
 * DefaultClause[Yield, Await, Return] :
 *   default : StatementList[?Yield, ?Await, ?Return]<opt>
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
 * @see https://tc39.es/ecma262/#prod-CaseClause
 */
export const writeSwitchCase: Writer<SwitchCase> = (node, write) => {
  if (node.test) {
    write('case');
    write(node.test);
  } else {
    write('default');
  }

  write(':');

  for (const statement of node.consequent) {
    write(statement);
  }
};
