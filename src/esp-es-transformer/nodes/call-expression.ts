import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformCallExpression = (node: IR.CallExpression) => {
  return injectSourceRange(
    node,
    ES.CallExpression(
      transform(node.callee),
      node.arguments.map(transform),
      false,
    ),
  );
};
