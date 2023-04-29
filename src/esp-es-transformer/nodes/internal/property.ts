import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-parser';
import { transform } from '../../transform';
import { withSourceRange } from '../../with-source-range';

export const transformProperty = (node: ESP.Property) => {
  return withSourceRange(
    node,
    ES.Property(
      transform(node.key),
      transform(node.value),
      'init',
      false,
      false,
      false,
    ),
  );
};
