import { clear, cyan, green, magenta, red, yellow } from '../ansi-escape-codes';
import { operatorsSet } from '../esp-grammar';
import { lexAll } from './lex-all';
import { Token } from './token';
import { TokenType } from './token-type';

const getTokenStyle = (token: Token) => {
  switch (token.type) {
    case TokenType.Identifier:
      return red;
    case TokenType.Keyword:
      return magenta;
    case TokenType.Number:
      return yellow;
    case TokenType.Punctuator:
      return operatorsSet.has(token.value) ? cyan : '';
    case TokenType.String:
      return green;
  }
};

export type SerializeOptions = {
  stylize?: boolean;
};

export const stylize = (data: string) => {
  const tokens = lexAll(data, 0);
  let lastIndex = 0;
  let output = '';

  for (const token of tokens) {
    output += data.slice(lastIndex, token.start);
    output += getTokenStyle(token);
    output += token.value;
    output += clear;
    lastIndex = token.end;
  }

  output += data.slice(lastIndex);

  return output;
};
