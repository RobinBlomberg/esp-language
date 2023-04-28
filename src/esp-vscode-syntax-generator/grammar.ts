import {
  constant,
  identifier,
  include,
  stringLiteral,
} from './pattern-factory';
import { Language } from './types';

export const language: Language = {
  name: 'ESP',
  scopeName: 'source.esp',
  patterns: [
    include('Comment'),
    include('Constant'),
    include('CallIdentifier'),
    include('Identifier'),
    include('Literal'),
  ],
  repository: {
    CallIdentifier: {
      patterns: [
        {
          name: 'entity.name.function.esp',
          match: `${identifier()}(?=\\s*(?:\\(|=\\s*:))`,
        },
      ],
    },
    Comment: {
      patterns: [
        {
          name: 'comment.block.esp',
          begin: '/\\*',
          beginCaptures: {
            0: { name: 'punctuation.definition.comment.esp' },
          },
          end: '\\*/',
          endCaptures: {
            0: { name: 'punctuation.definition.comment.esp' },
          },
        },
        {
          begin: '//',
          beginCaptures: {
            0: { name: 'comment.line.double-slash.esp' },
          },
          end: '(?=$)',
          contentName: 'comment.line.double-slash.esp',
        },
      ],
    },
    Constant: {
      patterns: [constant()],
    },
    Identifier: {
      patterns: [
        {
          name: 'variable.other.readwrite.esp',
          match: identifier(),
        },
      ],
    },
    Literal: {
      patterns: [include('NumericLiteral'), include('StringLiteral')],
    },
    NumericLiteral: {
      patterns: [
        {
          name: 'constant.numeric.decimal.esp',
          match: '\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?\\b',
        },
      ],
    },
    StringEscape: {
      name: 'constant.character.escape.esp',
      match: '\\\\',
    },
    StringLiteral: {
      patterns: [stringLiteral('single', "'"), stringLiteral('double', '"')],
    },
  },
};
