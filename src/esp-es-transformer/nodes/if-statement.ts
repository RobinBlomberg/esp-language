import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformIfStatement = (node: ESP.IfStatement) => {
  return ES.IfStatement(
    transformExpression(node.test),
    transformStatement(node.consequent),
    node.alternate ? transformStatement(node.alternate) : null,
  );
};
