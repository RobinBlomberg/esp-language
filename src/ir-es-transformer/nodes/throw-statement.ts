import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformThrowStatement = (node: IR.ThrowStatement) => {
  return injectSourceRange(node, ES.ThrowStatement(transform(node.argument)));
};
