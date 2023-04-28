import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformUpdateExpression = (node: ESP.UpdateExpression) => {
  return ES.UpdateExpression(
    node.operator,
    transform(node.argument),
    node.prefix,
  );
};
