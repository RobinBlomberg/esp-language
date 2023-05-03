import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformReturnStatement = (node: IR.ReturnStatement) => {
  return injectSourceRange(node, ES.ReturnStatement(transform(node.argument)));
};
