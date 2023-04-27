import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformStatement } from './statement';

export const transformScript: Transformer<ESP.Script> = (node) => {
  return ES.Program(node.body.map(transformStatement), 'script');
};
