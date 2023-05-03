import { ForOfStatement, NodeType } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ForInOfStatement[Yield, Await, Return] :
 *   for ( [lookahead ∉ { let, async of }] LeftHandSideExpression[?Yield, ?Await] of
 *     AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 *   for ( var ForBinding[?Yield, ?Await] of AssignmentExpression[+In, ?Yield, ?Await] )
 *     Statement[?Yield, ?Await, ?Return]
 *   for ( ForDeclaration[?Yield, ?Await] of AssignmentExpression[+In, ?Yield, ?Await] )
 *     Statement[?Yield, ?Await, ?Return]
 *   [+Await] for await ( [lookahead ≠ let] LeftHandSideExpression[?Yield, ?Await] of
 *     AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 *   [+Await] for await ( var ForBinding[?Yield, ?Await] of
 *     AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 *   [+Await] for await ( ForDeclaration[?Yield, ?Await] of
 *     AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
 *
 * ForBinding[Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await]
 *   BindingPattern[?Yield, ?Await]
 *
 * ForDeclaration[Yield, Await] :
 *   LetOrConst ForBinding[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ForInOfStatement
 */
export const writeForOfStatement: Writer<ForOfStatement> = (node, write) => {
  write('for');

  if (node.await) {
    write('await');
  }

  write('(');

  if (node.left.type === NodeType.VariableDeclaration) {
    write(node.left.kind);
    write(node.left.declarations[0]);
  } else {
    write(node.left);
  }

  write('of');
  write(node.right);
  write(')');
  write(node.body);
};
