import { ES } from '../../estree';
import { ESP } from '../../parser';

export const transformLiteral = (node: ESP.Literal) => {
  return node.value === undefined
    ? ES.Identifier('undefined')
    : ES.Literal(node.value);
};
