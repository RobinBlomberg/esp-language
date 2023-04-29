import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformDoWhileStatement = (node: ESP.DoWhileStatement) => {
  return withSourceRange(
    node,
    ES.DoWhileStatement(transform(node.body), transform(node.test)),
  );
};
