import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';
import { transformIdentifier } from './identifier';

export const transformStaticMemberExpression = (
  node: ESP.StaticMemberExpression,
) => {
  return ES.MemberExpression(
    transformExpression(node.object),
    transformIdentifier(node.property),
    false,
    false,
  );
};
