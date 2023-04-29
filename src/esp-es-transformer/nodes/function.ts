import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformFunction = (node: ESP.Function) => {
  return withSourceRange(
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
