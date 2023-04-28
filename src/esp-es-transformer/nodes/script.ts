import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformScript = (node: ESP.Script) => {
  return ES.Program(node.body.map(transform), 'script');
};
