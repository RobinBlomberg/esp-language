import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';
import { transformIdentifier } from './identifier';

export const transformProperty = (node: ESP.Property) => {
  return ES.Property(
    transformIdentifier(node.key),
    transformExpression(node.value),
    'init',
    false,
    false,
    false,
  );
};
