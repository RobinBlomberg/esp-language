import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformThrowStatement: Transformer<ESP.ThrowStatement> = (
  node,
) => {
  return ES.ThrowStatement(transformExpression(node.argument));
};
