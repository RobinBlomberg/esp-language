import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformAssignmentExpression = (
  node: ESP.AssignmentExpression,
) => {
  return injectSourceRange(
    node,
    ES.AssignmentExpression(
      node.operator,
      transform(node.left),
      transform(node.right),
    ),
  );
};
