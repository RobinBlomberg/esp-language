import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
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
