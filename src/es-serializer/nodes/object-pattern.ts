import { ObjectPattern } from '../../es-ast';
import { Writer } from '../serialize';

export const writeObjectPattern: Writer<ObjectPattern> = (node, write) => {
  write('{');
  write('}');
};
