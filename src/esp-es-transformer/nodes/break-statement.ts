import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';

export const transformBreakStatement = (node: ESP.BreakStatement) => {
  return injectSourceRange(node, ES.BreakStatement(null));
};
