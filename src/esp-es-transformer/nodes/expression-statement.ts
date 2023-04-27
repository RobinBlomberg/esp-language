import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformExpressionStatement: Transformer<
  ESP.ExpressionStatement
> = (node) => {
  return ES.ExpressionStatement(transformExpression(node.expression));
};
