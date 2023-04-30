import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformArrayLiteral = (node: ESP.ArrayLiteral) => {
  return injectSourceRange(
    node,
    ES.ArrayExpression(node.elements.map(transform)),
  );
};
