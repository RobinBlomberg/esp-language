import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformStatement } from './statement';

export const transformBlockStatement: Transformer<ESP.BlockStatement> = (
  node,
) => {
  return ES.BlockStatement(node.body.map(transformStatement));
};
