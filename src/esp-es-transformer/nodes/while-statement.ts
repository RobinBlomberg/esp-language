import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformWhileStatement = (node: ESP.WhileStatement) => {
  return ES.WhileStatement(
    transformExpression(node.test),
    transformStatement(node.body),
  );
};
