import { ES } from '../../../es';
import { UnaryExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformUnaryExpression = (node: UnaryExpression) => {
  return injectSourceRange(
    node,
    ES.AST.UnaryExpression(node.operator, true, transform(node.argument)),
  );
};
