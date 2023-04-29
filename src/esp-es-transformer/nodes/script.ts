import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformScript = (node: ESP.Script) => {
  return withSourceRange(node, ES.Program(node.body.map(transform), 'script'));
};
