import { ES } from '../../../es';
import { ComputedMemberExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformComputedMemberExpression = (
  node: ComputedMemberExpression,
) => {
  return injectSourceRange(
    node,
    ES.AST.MemberExpression(
      transform(node.object),
      transform(node.property),
      true,
      false,
    ),
  );
};
