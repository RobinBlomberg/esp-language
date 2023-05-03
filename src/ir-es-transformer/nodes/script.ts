import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformScript = (node: IR.Script) => {
  return injectSourceRange(
    node,
    ES.Program(node.body.map(transform), 'script'),
  );
};
