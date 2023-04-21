import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformComputedMemberExpression = (
  node: ESP.ComputedMemberExpression,
) => {
  return ES.MemberExpression(
    transformExpression(node.object),
    transformExpression(node.property),
    true,
    false,
  );
};
