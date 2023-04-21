import { Program } from '../../es-ast';
import { Writer } from '../serialize';

export const writeProgram: Writer<Program> = (node, write) => {
  for (const statement of node.body) {
    write(statement);
  }
};
