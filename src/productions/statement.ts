import { Statement } from '../ast';
import { Parser } from '../token-utils';
import { parseBlockStatement } from './block-statement';

export const parseStatement: Parser<Statement> = (data, i) => {
  return parseBlockStatement(data, i);
};
