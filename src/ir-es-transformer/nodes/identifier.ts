import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';

export const transformIdentifier = (node: IR.Identifier) => {
  return injectSourceRange(node, ES.Identifier(node.name));
};
