import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformNewExpression = (node: ESP.NewExpression) => {
  return ES.NewExpression(
    transformExpression(node.callee),
    node.arguments.map(transformExpression),
  );
};
