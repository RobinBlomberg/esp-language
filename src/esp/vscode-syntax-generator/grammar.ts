import {
  callIdentifier,
  commentBlockEnd,
  commentBlockStart,
  commentLineEnd,
  commentLineStart,
  constant,
  identifier,
  number,
  stringEscape,
} from './regexes';
import { Language, Pattern } from './types';

const include = (id: string) => {
  return {
    include: `#${id}` as const,
  };
};

const stringLiteral = (
  type: 'double' | 'single',
  quoteChar: string,
): Pattern => {
  return {
    name: `string.quoted.${type}.esp`,
    begin: quoteChar,
    beginCaptures: { 0: { name: 'punctuation.definition.string.begin.esp' } },
    end: quoteChar,
    endCaptures: { 0: { name: 'punctuation.definition.string.end.esp' } },
    patterns: [include('StringEscape')],
  };
};

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
          match: callIdentifier,
        },
      ],
    },
    Comment: {
      patterns: [
        {
          name: 'comment.block.esp',
          begin: commentBlockStart,
          beginCaptures: { 0: { name: 'punctuation.definition.comment.esp' } },
          end: commentBlockEnd,
          endCaptures: { 0: { name: 'punctuation.definition.comment.esp' } },
        },
        {
          begin: commentLineStart,
          beginCaptures: { 0: { name: 'comment.line.double-slash.esp' } },
          end: commentLineEnd,
          contentName: 'comment.line.double-slash.esp',
        },
      ],
    },
    Constant: {
      patterns: [constant],
    },
    Identifier: {
      patterns: [
        {
          name: 'variable.other.readwrite.esp',
          match: identifier,
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
          match: number,
        },
      ],
    },
    StringEscape: {
      name: 'constant.character.escape.esp',
      match: stringEscape,
    },
    StringLiteral: {
      patterns: [stringLiteral('single', "'"), stringLiteral('double', '"')],
    },
  },
};
