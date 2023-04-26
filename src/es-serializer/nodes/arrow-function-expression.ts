import { ArrowFunctionExpression, NodeType } from '../../es-ast';
import { Writer } from '../serialize';
import { writeParenthesizedList } from './internal/parenthesized-list';

/**
 * ```ecmarkup
 * ArrowFunction[In, Yield, Await] :
 *   ArrowParameters[?Yield, ?Await] [no LineTerminator here] => ConciseBody[?In]
 *
 * ArrowParameters[Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await]
 *   CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]
 *
 * ConciseBody[In] :
 *   [lookahead ≠ {] ExpressionBody[?In, ~Await]
 *   { FunctionBody[~Yield, ~Await] }
 *
 * AsyncArrowFunction[In, Yield, Await] :
 *   async [no LineTerminator here] AsyncArrowBindingIdentifier[?Yield] [no LineTerminator here] =>
 *     AsyncConciseBody[?In]
 *   CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await] [no LineTerminator here] =>
 *     AsyncConciseBody[?In]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ArrowFunction
 */
export const writeArrowFunctionExpression: Writer<ArrowFunctionExpression> = (
  node,
  write,
) => {
  if (node.async) {
    write('async');
  }

  writeParenthesizedList(node.params, write);
  write('=>');

  if (node.body.type === NodeType.ObjectExpression) {
    write('(');
  }

  write(node.body);

  if (node.body.type === NodeType.ObjectExpression) {
    write(')');
  }
};
