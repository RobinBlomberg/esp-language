import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformStaticMemberExpression = (
  node: ESP.StaticMemberExpression,
) => {
  return injectSourceRange(
    node,
    ES.MemberExpression(
      transform(node.object),
      transform(node.property),
      false,
      false,
    ),
  );
};
