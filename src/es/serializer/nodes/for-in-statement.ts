import { ForInStatement, NodeType } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ForInOfStatement[Yield, Await, Return] :
 *   for ( [lookahead ≠ let [] LeftHandSideExpression[?Yield, ?Await] in
 *     Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 *   for ( var ForBinding[?Yield, ?Await] in Expression[+In, ?Yield, ?Await] )
 *     Statement[?Yield, ?Await, ?Return]
 *   for ( ForDeclaration[?Yield, ?Await] in Expression[+In, ?Yield, ?Await] )
 *     Statement[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ForInOfStatement
 */
export const writeForInStatement: Writer<ForInStatement> = (node, write) => {
  write('for');
  write('(');

  if (node.left.type === NodeType.VariableDeclaration) {
    write(node.left.kind);
    write(node.left.declarations[0]);
  } else {
    write(node.left);
  }

  write('in');
  write(node.right);
  write(')');
  write(node.body);
};
