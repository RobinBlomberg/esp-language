import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformComputedMemberExpression: Transformer<
  ESP.ComputedMemberExpression
> = (node) => {
  return ES.MemberExpression(
    transformExpression(node.object),
    transformExpression(node.property),
    true,
    false,
  );
};
