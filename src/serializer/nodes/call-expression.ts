import { CallExpression } from '../../estree';
import { Writer } from '../write';

export const writeCallExpression: Writer<CallExpression> = (node, write) => {
  write(node.callee);
  write('(');

  for (let i = 0; i < node.arguments.length; i++) {
    if (i >= 1) {
      write(', ');
    }

    write(node.arguments[i]!);
  }

  write(')');
};
