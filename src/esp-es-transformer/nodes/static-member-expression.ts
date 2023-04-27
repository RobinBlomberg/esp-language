import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';
import { transformIdentifier } from './identifier';

export const transformStaticMemberExpression: Transformer<
  ESP.StaticMemberExpression
> = (node) => {
  return ES.MemberExpression(
    transformExpression(node.object),
    transformIdentifier(node.property),
    false,
    false,
  );
};
