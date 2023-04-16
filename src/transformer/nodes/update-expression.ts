import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformUpdateExpression = (node: ESP.UpdateExpression) => {
  return ES.UpdateExpression(
    node.operator,
    transformExpression(node.argument),
    true,
  );
};
