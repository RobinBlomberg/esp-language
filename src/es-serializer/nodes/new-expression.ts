import { NewExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * MemberExpression[Yield, Await] :
 *   ...
 *   new MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
 *   ...
 */
export const writeNewExpression: Writer<NewExpression> = (node, write) => {
  write('new');
  write(node.callee);
  write('(');

  for (let i = 0; i < node.arguments.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.arguments[i]!);
  }

  write(')');
};
