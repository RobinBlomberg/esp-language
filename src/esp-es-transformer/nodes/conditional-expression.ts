import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformConditionalExpression: Transformer<
  ESP.ConditionalExpression
> = (node) => {
  return ES.ConditionalExpression(
    transformExpression(node.test),
    transformExpression(node.alternate),
    transformExpression(node.consequent),
  );
};
