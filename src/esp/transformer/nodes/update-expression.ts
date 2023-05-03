import { ES } from '../../../es';
import { UpdateExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformUpdateExpression = (node: UpdateExpression) => {
  return injectSourceRange(
    node,
    ES.AST.UpdateExpression(
      node.operator,
      transform(node.argument),
      node.prefix,
    ),
  );
};
