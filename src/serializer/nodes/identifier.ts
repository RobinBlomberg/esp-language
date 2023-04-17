import { Identifier } from '../../estree';
import { Writer } from '../write';

export const writeIdentifier: Writer<Identifier> = (node, write) => {
  write(node.name);
};
