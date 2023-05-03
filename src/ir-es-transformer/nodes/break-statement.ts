import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';

export const transformBreakStatement = (node: IR.BreakStatement) => {
  return injectSourceRange(node, ES.BreakStatement(null));
};