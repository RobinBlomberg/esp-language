import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';

export const transformContinueStatement = (node: ESP.ContinueStatement) => {
  return ES.ContinueStatement(null);
};
