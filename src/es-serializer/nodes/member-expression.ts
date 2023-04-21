import { MemberExpression } from '../../es-ast';
import { Writer } from '../serialize';

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
