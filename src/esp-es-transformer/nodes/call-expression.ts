import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformCallExpression = (node: ESP.CallExpression) => {
  return injectSourceRange(
    node,
    ES.CallExpression(
      transform(node.callee),
      node.arguments.map(transform),
      false,
    ),
  );
};
