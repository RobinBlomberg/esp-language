import { SwitchStatement } from '../../estree';
import { Writer } from '../write';

export const writeSwitchStatement: Writer<SwitchStatement> = (node, write) => {
  write('switch');
  write('(');
  write(node.discriminant);
  write(')');
  write('{');

  for (const switchCase of node.cases) {
    write(switchCase);
  }

  write('}');
};
