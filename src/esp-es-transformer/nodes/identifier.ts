import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';

export const transformIdentifier: Transformer<ESP.Identifier> = (node) => {
  return ES.Identifier(node.name);
};
