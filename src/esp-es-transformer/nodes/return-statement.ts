import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformReturnStatement: Transformer<ESP.ReturnStatement> = (
  node,
) => {
  return ES.ReturnStatement(transformExpression(node.argument));
};
