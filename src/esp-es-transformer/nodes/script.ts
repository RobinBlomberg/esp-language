import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformScript = (node: ESP.Script) => {
  return injectSourceRange(
    node,
    ES.Program(node.body.map(transform), 'script'),
  );
};
