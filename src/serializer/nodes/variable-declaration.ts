import { VariableDeclaration } from '../../estree';
import { Writer } from '../write';

export const writeVariableDeclaration: Writer<VariableDeclaration> = (
  node,
  write,
) => {
  write(node.kind);

  for (let i = 0; i < node.declarations.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.declarations[i]!);
  }

  write(';');
};
