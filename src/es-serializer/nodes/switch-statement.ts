import { SwitchStatement } from '../../es-ast';
import { Writer } from '../serialize';

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
