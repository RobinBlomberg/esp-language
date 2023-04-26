import { ES } from '../../es-ast';

export const transformBreakStatement = () => {
  return ES.BreakStatement(null);
};
