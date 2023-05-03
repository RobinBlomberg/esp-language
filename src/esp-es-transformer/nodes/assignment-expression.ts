import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformAssignmentExpression = (
  node: IR.AssignmentExpression,
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
