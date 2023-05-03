import { ES } from '../../../es';
import { Identifier } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';

export const transformIdentifier = (node: Identifier) => {
  return injectSourceRange(node, ES.AST.Identifier(node.name));
};
