import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformConditionalExpression = (
  node: IR.ConditionalExpression,
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
