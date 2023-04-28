import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformStaticMemberExpression = (
  node: ESP.StaticMemberExpression,
) => {
  return ES.MemberExpression(
    transform(node.object),
    transform(node.property),
    false,
    false,
  );
};
