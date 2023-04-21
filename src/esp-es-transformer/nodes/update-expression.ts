import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformUpdateExpression = (node: ESP.UpdateExpression) => {
  return ES.UpdateExpression(
    node.operator,
    transformExpression(node.argument),
    node.prefix,
  );
};
