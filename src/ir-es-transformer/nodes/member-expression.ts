import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformMemberExpression = (node: IR.MemberExpression) => {
  return injectSourceRange(
    node,
    ES.MemberExpression(
      transform(node.object),
      transform(node.property),
      node.computed,
      false,
    ),
  );
};
