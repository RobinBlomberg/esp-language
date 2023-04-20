import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformStatement } from './statement';

export const transformScript = (node: ESP.Script) => {
  return ES.Program(node.body.map(transformStatement), 'script');
};
