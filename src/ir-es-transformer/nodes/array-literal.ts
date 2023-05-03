import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformArrayLiteral = (node: IR.ArrayLiteral) => {
  return injectSourceRange(
    node,
    ES.ArrayExpression(node.elements.map(transform)),
  );
};
