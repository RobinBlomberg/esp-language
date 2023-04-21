import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformStatement } from './statement';

export const transformScript = (node: ESP.Script) => {
  return ES.Program(node.body.map(transformStatement), 'script');
};
