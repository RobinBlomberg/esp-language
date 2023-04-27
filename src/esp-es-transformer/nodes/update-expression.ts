import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformUpdateExpression: Transformer<ESP.UpdateExpression> = (
  node,
) => {
  return ES.UpdateExpression(
    node.operator,
    transformExpression(node.argument),
    node.prefix,
  );
};
