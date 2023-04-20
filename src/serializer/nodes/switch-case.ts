import { SwitchCase } from '../../estree';
import { Writer } from '../write';

export const writeSwitchCase: Writer<SwitchCase> = (node, write) => {
  if (node.test) {
    write('case');
    write(node.test);
  } else {
    write('default');
  }

  write(':');

  for (const statement of node.consequent) {
    write(statement);
  }
};
