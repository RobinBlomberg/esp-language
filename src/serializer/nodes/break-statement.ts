import { BreakStatement } from '../../estree';
import { Writer } from '../write';

export const writeBreakStatement: Writer<BreakStatement> = (node, write) => {
  write('break');
  write(';');
};
