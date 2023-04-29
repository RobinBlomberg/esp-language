import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformConditionalExpression = (
  node: ESP.ConditionalExpression,
) => {
  return withSourceRange(
    node,
    ES.ConditionalExpression(
      transform(node.test),
      transform(node.alternate),
      transform(node.consequent),
    ),
  );
};
