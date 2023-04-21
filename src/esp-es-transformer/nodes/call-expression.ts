import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformCallExpression = (node: ESP.CallExpression) => {
  return ES.CallExpression(
    transformExpression(node.callee),
    node.arguments.map(transformExpression),
    false,
  );
};
