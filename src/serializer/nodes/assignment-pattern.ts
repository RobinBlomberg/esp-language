import { AssignmentPattern } from '../../estree';
import { Writer } from '../write';

export const writeAssignmentPattern: Writer<AssignmentPattern> = (
  node,
  write,
) => {
  write(node.left);
  write('=');
  write(node.right);
};
