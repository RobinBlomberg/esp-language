import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformWhileStatement: Transformer<ESP.WhileStatement> = (
  node,
) => {
  return ES.WhileStatement(
    transformExpression(node.test),
    transformStatement(node.body),
  );
};
