import { ES } from '../../../es';
import { NewExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformNewExpression = (node: NewExpression) => {
  return injectSourceRange(
    node,
    ES.AST.NewExpression(transform(node.callee), node.arguments.map(transform)),
  );
};
