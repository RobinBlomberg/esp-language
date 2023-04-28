import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-parser';
import { transform } from '../../transform';

export const transformProperty = (node: ESP.Property) => {
  return ES.Property(
    transform(node.key),
    transform(node.value),
    'init',
    false,
    false,
    false,
  );
};
