import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformArrayLiteral = (node: ESP.ArrayLiteral) => {
  return ES.ArrayExpression(node.elements.map(transform));
};
