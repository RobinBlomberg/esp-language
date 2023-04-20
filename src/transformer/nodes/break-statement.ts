import { ES } from '../../estree';
import { ESP } from '../../parser';

export const transformBreakStatement = (node: ESP.BreakStatement) => {
  return ES.BreakStatement(null);
};
