import { ES } from '../../estree';
import { ESP } from '../../parser';

export const transformIdentifier = (node: ESP.Identifier) => {
  return ES.Identifier(node.name);
};
