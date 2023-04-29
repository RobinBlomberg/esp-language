import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformBlockStatement = (node: ESP.BlockStatement) => {
  return withSourceRange(node, ES.BlockStatement(node.body.map(transform)));
};
