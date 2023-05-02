import { lex } from './lex';
import { Token } from './token';

export const lexAll = (data: string, i = 0) => {
  const tokens: Token[] = [];

  while (true) {
    const token = lex(data, i);

    if (token.abrupt) {
      return tokens;
    }

    tokens.push(token);
    i = token.end;
  }
};
