import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformNewExpression = (node: ESP.NewExpression) => {
  return withSourceRange(
    node,
    ES.NewExpression(transform(node.callee), node.arguments.map(transform)),
  );
};
