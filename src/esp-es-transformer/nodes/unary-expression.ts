import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformUnaryExpression: Transformer<ESP.UnaryExpression> = (
  node,
) => {
  return ES.UnaryExpression(
    node.operator,
    true,
    transformExpression(node.argument),
  );
};
