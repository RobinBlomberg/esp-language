import { NewExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';
import { writeParenthesizedList } from './internal/parenthesized-list';

/**
 * MemberExpression[Yield, Await] :
 *   ...
 *   new MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
 *   ...
 */
export const writeNewExpression: Writer<NewExpression> = (node, write) => {
  write('new');
  writeExpression(node, node.callee, write);
  writeParenthesizedList(node.arguments, write);
};
