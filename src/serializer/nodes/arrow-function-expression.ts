import { ArrowFunctionExpression } from '../../estree';
import { Writer } from '../write';

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
