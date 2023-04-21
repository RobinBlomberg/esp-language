import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformDoWhileStatement = (node: ESP.DoWhileStatement) => {
  return ES.DoWhileStatement(
    transformStatement(node.body),
    transformExpression(node.test),
  );
};
