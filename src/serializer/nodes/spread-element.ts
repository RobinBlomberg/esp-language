import { SpreadElement } from '../../estree';
import { Writer } from '../write';

export const writeSpreadElement: Writer<SpreadElement> = (node, write) => {
  write('...');
  write(node.argument);
};
