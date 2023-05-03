import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformReturnStatement = (node: ESP.ReturnStatement) => {
  return injectSourceRange(node, ES.ReturnStatement(transform(node.argument)));
};
