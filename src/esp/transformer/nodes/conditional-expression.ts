import { ES } from '../../../es';
import { ConditionalExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformConditionalExpression = (node: ConditionalExpression) => {
  return injectSourceRange(
    node,
    ES.AST.ConditionalExpression(
      transform(node.test),
      transform(node.consequent),
      transform(node.alternate),
    ),
  );
};
