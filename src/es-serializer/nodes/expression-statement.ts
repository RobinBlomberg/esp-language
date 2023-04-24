import { ExpressionStatement } from '../../es-ast';
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
  write(node.expression);
  write(';');
};
