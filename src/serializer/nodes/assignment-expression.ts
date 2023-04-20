import { AssignmentExpression } from '../../estree';
import { Writer } from '../write';

export const writeAssignmentExpression: Writer<AssignmentExpression> = (
  node,
  write,
) => {
  write(node.left);
  write(node.operator);
  write(node.right);
};
