import {
  blue,
  clear,
  cyan,
  green,
  magenta,
  red,
  yellow,
} from '../../utils/ansi/escape-codes';
import { ConstantKeywordsSet, OperatorsSet } from '../grammar';
import { lexAll } from './lex-all';
import { Token } from './token';
import { TokenType } from './token-type';

const getTokenStyle = (token: Token) => {
  switch (token.type) {
    case TokenType.Identifier:
      return red;
    case TokenType.Keyword:
      return ConstantKeywordsSet.has(token.value) ? yellow : magenta;
    case TokenType.Number:
      return yellow;
    case TokenType.Punctuator:
      return OperatorsSet.has(token.value) ? cyan : '';
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

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;
    const lookahead = tokens
      .slice(i + 1)
      .map((t) => t.value)
      .join('');

    output += data.slice(lastIndex, token.start);

    if (token.type === TokenType.Identifier && /^(?:\(|=:)/.test(lookahead)) {
      output += blue;
    } else {
      output += getTokenStyle(token);
    }

    output += token.value;
    output += clear;
    lastIndex = token.end;
  }

  output += data.slice(lastIndex);

  return output;
};
