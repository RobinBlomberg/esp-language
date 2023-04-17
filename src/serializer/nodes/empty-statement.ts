import { EmptyStatement } from '../../estree';
import { Writer } from '../write';

export const writeEmptyStatement: Writer<EmptyStatement> = (node, write) => {
  write(';');
};
