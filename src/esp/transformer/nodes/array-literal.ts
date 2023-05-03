import { ES } from '../../../es';
import { ArrayLiteral } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformArrayLiteral = (node: ArrayLiteral) => {
  return injectSourceRange(
    node,
    ES.AST.ArrayExpression(node.elements.map(transform)),
  );
};
