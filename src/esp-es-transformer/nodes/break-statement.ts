import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { withSourceRange } from '../with-source-range';

export const transformBreakStatement = (node: ESP.BreakStatement) => {
  return withSourceRange(node, ES.BreakStatement(null));
};
