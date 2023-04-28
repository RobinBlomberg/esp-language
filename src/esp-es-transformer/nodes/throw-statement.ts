import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformThrowStatement = (node: ESP.ThrowStatement) => {
  return ES.ThrowStatement(transform(node.argument));
};
