import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformUpdateExpression = (node: ESP.UpdateExpression) => {
  return injectSourceRange(
    node,
    ES.UpdateExpression(node.operator, transform(node.argument), node.prefix),
  );
};
