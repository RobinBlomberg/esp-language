import { ArrayPattern } from '../../estree';
import { Writer } from '../write';

export const writeArrayPattern: Writer<ArrayPattern> = (node, write) => {
  write('[');

  for (let i = 0; i < node.elements.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.elements[i]!);
  }

  write(']');
};
