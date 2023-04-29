import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { withSourceRange } from '../with-source-range';

export const transformIdentifier = (node: ESP.Identifier) => {
  return withSourceRange(node, ES.Identifier(node.name));
};
