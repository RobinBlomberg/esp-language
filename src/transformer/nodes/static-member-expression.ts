import { ES } from '../../estree';
import { ESP } from '../../parser';
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
