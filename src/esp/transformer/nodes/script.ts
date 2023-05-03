import { ES } from '../../../es';
import { Script } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformScript = (node: Script) => {
  return injectSourceRange(
    node,
    ES.AST.Program(node.body.map(transform), 'script'),
  );
};
