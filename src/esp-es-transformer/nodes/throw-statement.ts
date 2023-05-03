import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformThrowStatement = (node: ESP.ThrowStatement) => {
  return injectSourceRange(node, ES.ThrowStatement(transform(node.argument)));
};
