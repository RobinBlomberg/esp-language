import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformReturnStatement = (node: ESP.ReturnStatement) => {
  return withSourceRange(node, ES.ReturnStatement(transform(node.argument)));
};
