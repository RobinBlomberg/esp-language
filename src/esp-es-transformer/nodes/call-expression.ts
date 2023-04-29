import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformCallExpression = (node: ESP.CallExpression) => {
  return withSourceRange(
    node,
    ES.CallExpression(
      transform(node.callee),
      node.arguments.map(transform),
      false,
    ),
  );
};
