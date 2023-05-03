import { ES } from '../../../es';
import { ContinueStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';

export const transformContinueStatement = (node: ContinueStatement) => {
  return injectSourceRange(node, ES.AST.ContinueStatement(null));
};
