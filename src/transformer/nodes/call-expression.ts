import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformCallExpression = (node: ESP.CallExpression) => {
  return ES.CallExpression(
    transformExpression(node.callee),
    node.arguments.map(transformExpression),
    false,
  );
};
