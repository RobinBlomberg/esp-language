import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformDoWhileStatement = (node: ESP.DoWhileStatement) => {
  return ES.DoWhileStatement(
    transformStatement(node.body),
    transformExpression(node.test),
  );
};
