import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformWhileStatement = (node: ESP.WhileStatement) => {
  return ES.WhileStatement(
    transformExpression(node.test),
    transformStatement(node.body),
  );
};
