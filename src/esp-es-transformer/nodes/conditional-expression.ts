import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformConditionalExpression = (
  node: ESP.ConditionalExpression,
) => {
  return ES.ConditionalExpression(
    transform(node.test),
    transform(node.alternate),
    transform(node.consequent),
  );
};
