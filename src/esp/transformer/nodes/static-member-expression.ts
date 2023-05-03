import { ES } from '../../../es';
import { StaticMemberExpression } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformStaticMemberExpression = (
  node: StaticMemberExpression,
) => {
  return injectSourceRange(
    node,
    ES.AST.MemberExpression(
      transform(node.object),
      transform(node.property),
      false,
      false,
    ),
  );
};
