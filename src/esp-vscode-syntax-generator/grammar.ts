import { constantKeywords, controlKeywords } from '../esp-grammar';
import { include, stringLiteral } from './pattern-factory';
import { Language } from './types';

export const language: Language = {
  name: 'ESP',
  scopeName: 'source.esp',
  patterns: [include('Expression')],
  repository: {
    ConstantLiteral: {
      patterns: [
        {
          name: 'constant.language.esp',
          match: `\\b(${constantKeywords.join('|')})\\b`,
        },
      ],
    },
    Expression: {
      patterns: [
        include('Literal'),
        include('Keyword'),
        include('FunctionName'),
        include('Identifier'),
      ],
    },
    FunctionName: {
      patterns: [
        {
          name: 'entity.name.function.esp',
          match: /\b[a-zA-Z$_][a-zA-Z0-9$_]*(?=\s*\()/.source,
        },
      ],
    },
    Identifier: {
      patterns: [
        {
          name: 'variable.other.readwrite.esp',
          match: /\b[a-zA-Z$_][a-zA-Z0-9$_]*\b/.source,
        },
      ],
    },
    Keyword: {
      patterns: [
        {
          name: 'keyword.control.esp',
          match: `\\b(${controlKeywords.join('|')})\\b`,
        },
      ],
    },
    Literal: {
      patterns: [
        include('ConstantLiteral'),
        include('NumericLiteral'),
        include('StringLiteral'),
      ],
    },
    NumericLiteral: {
      patterns: [
        {
          name: 'constant.numeric.decimal.esp',
          match: /0|[1-9][0-9]*/.source,
        },
      ],
    },
    StringLiteral: {
      patterns: [stringLiteral('single', "'"), stringLiteral('double', '"')],
    },
  },
};
