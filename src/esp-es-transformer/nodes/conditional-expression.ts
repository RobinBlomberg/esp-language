import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformConditionalExpression = (
  node: ESP.ConditionalExpression,
) => {
  return injectSourceRange(
    node,
    ES.ConditionalExpression(
      transform(node.test),
      transform(node.consequent),
      transform(node.alternate),
    ),
  );
};
