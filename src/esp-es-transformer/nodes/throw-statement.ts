import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformThrowStatement = (node: ESP.ThrowStatement) => {
  return withSourceRange(node, ES.ThrowStatement(transform(node.argument)));
};
