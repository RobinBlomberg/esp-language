import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformIfStatement = (node: ESP.IfStatement) => {
  return ES.IfStatement(
    transform(node.test),
    transform(node.consequent),
    node.alternate ? transform(node.alternate) : null,
  );
};
