import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformUpdateExpression = (node: ESP.UpdateExpression) => {
  return withSourceRange(
    node,
    ES.UpdateExpression(node.operator, transform(node.argument), node.prefix),
  );
};
