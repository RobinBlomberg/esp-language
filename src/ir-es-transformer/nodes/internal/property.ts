import { ES } from '../../../es-ast';
import { IR } from '../../../ir-ast';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformProperty = (node: IR.Property) => {
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
