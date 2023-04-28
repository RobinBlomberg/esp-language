import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';

export const transformLiteral = (node: ESP.Literal) => {
  return node.value === undefined
    ? ES.Identifier('undefined')
    : ES.Literal(node.value);
};
