import { ES } from '../../../es';
import { AssignmentExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformAssignmentExpression = (node: AssignmentExpression) => {
  return injectSourceRange(
    node,
    ES.AST.AssignmentExpression(
      node.operator,
      transform(node.left),
      transform(node.right),
    ),
  );
};
