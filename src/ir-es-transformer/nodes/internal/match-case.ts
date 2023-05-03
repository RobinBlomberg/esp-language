import { ES } from '../../../es-ast';
import { IR } from '../../../ir';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformMatchCase = (node: IR.MatchCase) => {
  const lastIndex = node.tests.length - 1;

  return node.tests.map((value, index) => {
    return injectSourceRange(
      value,
      ES.SwitchCase(
        transform(value),
        index === lastIndex
          ? [transform(node.consequent), ES.BreakStatement(null)]
          : [],
      ),
    );
  });
};
