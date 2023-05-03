import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-grammar';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformProperty = (node: ESP.Property) => {
  return injectSourceRange(
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
