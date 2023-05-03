import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformComputedMemberExpression = (
  node: ESP.ComputedMemberExpression,
) => {
  return injectSourceRange(
    node,
    ES.MemberExpression(
      transform(node.object),
      transform(node.property),
      true,
      false,
    ),
  );
};
