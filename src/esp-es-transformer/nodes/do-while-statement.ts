import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformDoWhileStatement = (node: ESP.DoWhileStatement) => {
  return injectSourceRange(
    node,
    ES.DoWhileStatement(transform(node.body), transform(node.test)),
  );
};
