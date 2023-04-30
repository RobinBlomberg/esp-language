import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';

export const transformIdentifier = (node: ESP.Identifier) => {
  return injectSourceRange(node, ES.Identifier(node.name));
};
