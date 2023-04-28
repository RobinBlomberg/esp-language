import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformAssignmentExpression = (
  node: ESP.AssignmentExpression,
) => {
  return ES.AssignmentExpression(
    node.operator,
    transform(node.left),
    transform(node.right),
  );
};
