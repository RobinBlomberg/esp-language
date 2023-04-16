import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformArrayLiteral = (node: ESP.ArrayLiteral) => {
  return ES.ArrayExpression(node.elements.map(transformExpression));
};
