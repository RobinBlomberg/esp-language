import { lex } from './lex';
import { Token } from './token';
import { abrupt } from './token-utils';

export const lexAll = (data: string, i = 0) => {
  const tokens: Token[] = [];

  while (true) {
    const token = lex(data, i);

    if (abrupt(token)) {
      return tokens;
    }

    tokens.push(token);
    i = token.end;
  }
};
