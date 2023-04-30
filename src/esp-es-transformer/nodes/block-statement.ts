import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformBlockStatement = (node: ESP.BlockStatement) => {
  return injectSourceRange(node, ES.BlockStatement(node.body.map(transform)));
};
