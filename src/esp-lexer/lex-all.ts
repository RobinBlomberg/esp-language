import { lex } from './lex';
import { Token } from './token';
import { isAbrupt } from './token-utils';

export const lexAll = (data: string, i = 0) => {
  const tokens: Token[] = [];

  while (true) {
    const token = lex(data, i);

    if (isAbrupt(token)) {
      return tokens;
    }

    tokens.push(token);
    i = token.end;
  }
};
