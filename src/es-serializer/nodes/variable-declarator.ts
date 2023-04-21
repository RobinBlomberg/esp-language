import { VariableDeclarator } from '../../es-ast';
import { Writer } from '../serialize';

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
