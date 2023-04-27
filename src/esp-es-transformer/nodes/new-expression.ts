import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformNewExpression: Transformer<ESP.NewExpression> = (
  node,
) => {
  return ES.NewExpression(
    transformExpression(node.callee),
    node.arguments.map(transformExpression),
  );
};
