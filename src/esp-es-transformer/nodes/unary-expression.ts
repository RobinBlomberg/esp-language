import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformUnaryExpression = (node: ESP.UnaryExpression) => {
  return injectSourceRange(
    node,
    ES.UnaryExpression(node.operator, true, transform(node.argument)),
  );
};
