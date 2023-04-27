import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformBinaryExpression: Transformer<ESP.BinaryExpression> = (
  node,
) => {
  if (
    node.operator === '&&' ||
    node.operator === '||' ||
    node.operator === '??'
  ) {
    return ES.LogicalExpression(
      node.operator,
      transformExpression(node.left),
      transformExpression(node.right),
    );
  }

  return ES.BinaryExpression(
    node.operator,
    transformExpression(node.left),
    transformExpression(node.right),
  );
};
