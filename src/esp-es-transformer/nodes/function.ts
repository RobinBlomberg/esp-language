import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformFunction = (node: IR.Function) => {
  return injectSourceRange(
    node,
    ES.ArrowFunctionExpression(
      null,
      node.params.map(transform),
      transform(node.body),
      false,
      false,
    ),
  );
};
