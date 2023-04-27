import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformArrayLiteral: Transformer<ESP.ArrayLiteral> = (node) => {
  return ES.ArrayExpression(node.elements.map(transformExpression));
};
