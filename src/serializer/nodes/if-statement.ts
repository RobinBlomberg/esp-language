import { IfStatement } from '../../estree';
import { Writer } from '../write';

export const writeIfStatement: Writer<IfStatement> = (node, write) => {
  write('if');
  write('(');
  write(node.test);
  write(')');
  write(node.consequent);

  if (node.alternate) {
    write('else');
    write(node.alternate);
  }
};
