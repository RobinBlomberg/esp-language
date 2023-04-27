import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformIfStatement: Transformer<ESP.IfStatement> = (node) => {
  return ES.IfStatement(
    transformExpression(node.test),
    transformStatement(node.consequent),
    node.alternate ? transformStatement(node.alternate) : null,
  );
};
