import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';

export const transformLiteral: Transformer<ESP.Literal> = (node) => {
  return node.value === undefined
    ? ES.Identifier('undefined')
    : ES.Literal(node.value);
};
