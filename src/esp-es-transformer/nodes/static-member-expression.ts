import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformStaticMemberExpression = (
  node: ESP.StaticMemberExpression,
) => {
  return withSourceRange(
    node,
    ES.MemberExpression(
      transform(node.object),
      transform(node.property),
      false,
      false,
    ),
  );
};
