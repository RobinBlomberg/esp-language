import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformUnaryExpression = (node: ESP.UnaryExpression) => {
  return withSourceRange(
    node,
    ES.UnaryExpression(node.operator, true, transform(node.argument)),
  );
};
