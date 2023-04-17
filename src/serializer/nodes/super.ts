import { Super } from '../../estree';
import { Writer } from '../write';

export const writeSuper: Writer<Super> = (node, write) => {
  write('super');
};
