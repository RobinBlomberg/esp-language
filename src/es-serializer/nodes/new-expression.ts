import { NewExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeParenthesizedList } from './internal/parenthesized-list';

/**
 * MemberExpression[Yield, Await] :
 *   ...
 *   new MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
 *   ...
 */
export const writeNewExpression: Writer<NewExpression> = (node, write) => {
  write('new');
  write(node.callee);
  writeParenthesizedList(node.arguments, write);
};
