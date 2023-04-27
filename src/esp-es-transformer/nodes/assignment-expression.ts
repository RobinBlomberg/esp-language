import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformAssignmentExpression: Transformer<
  ESP.AssignmentExpression
> = (node) => {
  return ES.AssignmentExpression(
    node.operator,
    transformExpression(node.left),
    transformExpression(node.right),
  );
};
