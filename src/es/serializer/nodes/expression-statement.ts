import { ExpressionStatement, NodeType } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ExpressionStatement[Yield, Await] :
 *   [lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }]
 *     Expression[+In, ?Yield, ?Await] ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ExpressionStatement
 */
export const writeExpressionStatement: Writer<ExpressionStatement> = (
  node,
  write,
) => {
  if (node.expression.type === NodeType.ObjectExpression) {
    write('(');
  }

  write(node.expression);

  if (node.expression.type === NodeType.ObjectExpression) {
    write(')');
  }

  write(';');
};
