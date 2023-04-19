import { ArrowFunctionExpression } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * ArrowFunction[In, Yield, Await] :
 *   ArrowParameters[?Yield, ?Await] [no LineTerminator here] => ConciseBody[?In]
 *
 * ArrowParameters[Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await]
 *   CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]
 *
 * CoverParenthesizedExpressionAndArrowParameterList[Yield, Await] :
 *   ( Expression[+In, ?Yield, ?Await] )
 *   ( Expression[+In, ?Yield, ?Await] , )
 *   ( )
 *   ( ... BindingIdentifier[?Yield, ?Await] )
 *   ( ... BindingPattern[?Yield, ?Await] )
 *   ( Expression[+In, ?Yield, ?Await] , ... BindingIdentifier[?Yield, ?Await] )
 *   ( Expression[+In, ?Yield, ?Await] , ... BindingPattern[?Yield, ?Await] )
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

  write('(');

  for (let i = 0; i < node.params.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.params[i]!);
  }

  write(')');
  write('=>');
  write(node.body);
};
