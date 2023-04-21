import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformArrayLiteral = (node: ESP.ArrayLiteral) => {
  return ES.ArrayExpression(node.elements.map(transformExpression));
};
