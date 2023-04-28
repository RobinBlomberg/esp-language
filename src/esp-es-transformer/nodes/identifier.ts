import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';

export const transformIdentifier = (node: ESP.Identifier) => {
  return ES.Identifier(node.name);
};
