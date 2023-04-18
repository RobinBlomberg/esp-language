import { RestElement } from '../../estree';
import { Writer } from '../write';

export const writeRestElement: Writer<RestElement> = (node, write) => {
  write('...');
  write(node.argument);
};
