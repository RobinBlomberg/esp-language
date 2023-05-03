import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';

export const transformContinueStatement = (node: ESP.ContinueStatement) => {
  return injectSourceRange(node, ES.ContinueStatement(null));
};
