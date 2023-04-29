import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformArrayLiteral = (node: ESP.ArrayLiteral) => {
  return withSourceRange(
    node,
    ES.ArrayExpression(node.elements.map(transform)),
  );
};
