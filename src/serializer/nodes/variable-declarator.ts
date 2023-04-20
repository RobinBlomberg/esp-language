import { VariableDeclarator } from '../../estree';
import { Writer } from '../write';

export const writeVariableDeclarator: Writer<VariableDeclarator> = (
  node,
  write,
) => {
  write(node.id);

  if (node.init) {
    write('=');
    write(node.init);
  }
};
