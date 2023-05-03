import { ES } from '../../../../es';
import { Property } from '../../../grammar';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformProperty = (node: Property) => {
  return injectSourceRange(
    node,
    ES.AST.Property(
      transform(node.key),
      transform(node.value),
      'init',
      false,
      false,
      false,
    ),
  );
};
