import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformNewExpression = (node: ESP.NewExpression) => {
  return injectSourceRange(
    node,
    ES.NewExpression(transform(node.callee), node.arguments.map(transform)),
  );
};
