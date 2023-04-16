import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformNewExpression = (node: ESP.NewExpression) => {
  return ES.NewExpression(
    transformExpression(node.callee),
    node.arguments.map(transformExpression),
  );
};
