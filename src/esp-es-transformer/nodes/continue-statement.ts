import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';

export const transformContinueStatement = (node: IR.ContinueStatement) => {
  return injectSourceRange(node, ES.ContinueStatement(null));
};
