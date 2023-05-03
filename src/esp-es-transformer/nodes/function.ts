import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformFunction = (node: ESP.Function) => {
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
