import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformAssignmentExpression = (
  node: ESP.AssignmentExpression,
) => {
  return ES.AssignmentExpression(
    node.operator,
    transformExpression(node.left),
    transformExpression(node.right),
  );
};
