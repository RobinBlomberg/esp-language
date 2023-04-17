import { MemberExpression } from '../../estree';
import { Writer } from '../write';

export const writeMemberExpression: Writer<MemberExpression> = (
  node,
  write,
) => {
  write(node.object);

  if (node.computed) {
    if (node.optional) {
      write('?.');
    }

    write('[');
    write(node.property);
    write(']');
  } else {
    if (node.optional) {
      write('?');
    }

    write('.');
    write(node.property);
  }
};
