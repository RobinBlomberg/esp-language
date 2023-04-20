import { CallExpression } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * CallExpression[Yield, Await] :
 *   ...
 *   CallExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
 *   ...
 *
 * Arguments[Yield, Await] :
 *   ( )
 *   ( ArgumentList[?Yield, ?Await] )
 *   ( ArgumentList[?Yield, ?Await] , )
 *
 * ArgumentList[Yield, Await] :
 *   AssignmentExpression[+In, ?Yield, ?Await]
 *   ... AssignmentExpression[+In, ?Yield, ?Await]
 *   ArgumentList[?Yield, ?Await] , AssignmentExpression[+In, ?Yield, ?Await]
 *   ArgumentList[?Yield, ?Await] , ... AssignmentExpression[+In, ?Yield, ?Await]
 *
 * OptionalExpression[Yield, Await] :
 *   ...
 *   CallExpression[?Yield, ?Await] OptionalChain[?Yield, ?Await]
 *   ...
 *
 * OptionalChain[Yield, Await] :
 *   ?. Arguments[?Yield, ?Await]
 *   ...
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-CallExpression
 * @see https://tc39.es/ecma262/#prod-OptionalExpression
 */
export const writeCallExpression: Writer<CallExpression> = (node, write) => {
  write(node.callee);

  if (node.optional) {
    write('?.');
  }

  write('(');

  for (let i = 0; i < node.arguments.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.arguments[i]!);
  }

  write(')');
};
