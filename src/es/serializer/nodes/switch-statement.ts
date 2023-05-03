import { SwitchStatement } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup'
 * SwitchStatement[Yield, Await, Return] :
 *   switch ( Expression[+In, ?Yield, ?Await] ) CaseBlock[?Yield, ?Await, ?Return]
 *
 * CaseBlock[Yield, Await, Return] :
 *   { CaseClauses[?Yield, ?Await, ?Return]<opt> }
 *   { CaseClauses[?Yield, ?Await, ?Return]<opt> DefaultClause[?Yield, ?Await, ?Return]
 *     CaseClauses[?Yield, ?Await, ?Return]<opt> }
 *
 * CaseClauses[Yield, Await, Return] :
 *   CaseClause[?Yield, ?Await, ?Return]
 *   CaseClauses[?Yield, ?Await, ?Return] CaseClause[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-SwitchStatement
 */
export const writeSwitchStatement: Writer<SwitchStatement> = (node, write) => {
  write('switch');
  write('(');
  write(node.discriminant);
  write(')');
  write('{');

  for (const switchCase of node.cases) {
    write(switchCase);
  }

  write('}');
};
