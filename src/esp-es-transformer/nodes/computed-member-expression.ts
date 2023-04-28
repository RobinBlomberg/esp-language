import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformComputedMemberExpression = (
  node: ESP.ComputedMemberExpression,
) => {
  return ES.MemberExpression(
    transform(node.object),
    transform(node.property),
    true,
    false,
  );
};
