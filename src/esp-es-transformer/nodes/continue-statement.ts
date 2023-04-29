import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { withSourceRange } from '../with-source-range';

export const transformContinueStatement = (node: ESP.ContinueStatement) => {
  return withSourceRange(node, ES.ContinueStatement(null));
};
