import { Program } from '../../estree';
import { Writer } from '../write';

export const writeProgram: Writer<Program> = (node, write) => {
  for (const statement of node.body) {
    write(statement);
  }
};
