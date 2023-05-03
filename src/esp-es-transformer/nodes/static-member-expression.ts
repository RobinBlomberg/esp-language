import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformStaticMemberExpression = (
  node: IR.StaticMemberExpression,
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
