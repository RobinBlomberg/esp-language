import { ES } from '../../../es';
import { BreakStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';

export const transformBreakStatement = (node: BreakStatement) => {
  return injectSourceRange(node, ES.AST.BreakStatement(null));
};
