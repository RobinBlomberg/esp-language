import { CallExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeParenthesizedList } from './internal/parenthesized-list';

/**
 * ```ecmarkup
 * CallExpression[Yield, Await] :
 *   ...
 *   CallExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
 *   ...
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

  writeParenthesizedList(node.arguments, write);
};
