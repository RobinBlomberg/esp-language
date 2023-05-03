import { ES } from '../../../es';
import { CallExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformCallExpression = (node: CallExpression) => {
  return injectSourceRange(
    node,
    ES.AST.CallExpression(
      transform(node.callee),
      node.arguments.map(transform),
      false,
    ),
  );
};
