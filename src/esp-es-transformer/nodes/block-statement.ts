import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformBlockStatement = (node: IR.BlockStatement) => {
  return injectSourceRange(node, ES.BlockStatement(node.body.map(transform)));
};
