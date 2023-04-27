import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformDoWhileStatement: Transformer<ESP.DoWhileStatement> = (
  node,
) => {
  return ES.DoWhileStatement(
    transformStatement(node.body),
    transformExpression(node.test),
  );
};
