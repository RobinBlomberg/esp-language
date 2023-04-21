import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';

export const transformBreakStatement = (node: ESP.BreakStatement) => {
  return ES.BreakStatement(null);
};
