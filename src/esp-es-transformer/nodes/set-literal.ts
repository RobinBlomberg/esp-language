import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformSetLiteral: Transformer<ESP.SetLiteral> = (node) => {
  return ES.NewExpression(ES.Identifier('Set'), [
    ES.ArrayExpression(node.values.map(transformExpression)),
  ]);
};
