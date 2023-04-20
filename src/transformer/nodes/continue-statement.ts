import { ES } from '../../estree';
import { ESP } from '../../parser';

export const transformContinueStatement = (node: ESP.ContinueStatement) => {
  return ES.ContinueStatement(null);
};
