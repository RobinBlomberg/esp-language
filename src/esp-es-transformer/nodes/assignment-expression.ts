import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformAssignmentExpression = (
  node: ESP.AssignmentExpression,
) => {
  return withSourceRange(
    node,
    ES.AssignmentExpression(
      node.operator,
      transform(node.left),
      transform(node.right),
    ),
  );
};
