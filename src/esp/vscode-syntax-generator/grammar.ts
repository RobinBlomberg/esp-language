import { escapeRegExpString } from '../../utils/escape-regexp-string';
import { Name } from './names';
import {
  ConstantKeywordNames,
  ControlKeywordNames,
  OperatorNames,
  PunctuationNames,
} from './semantic-names';
import { Captures, Language, Pattern } from './types';

const constant = (): Pattern => {
  const nameMatchesMap: { [K in Name]?: string[] } = {};

  for (const [match, name] of [
    ...Object.entries(ConstantKeywordNames),
    ...Object.entries(ControlKeywordNames),
    ...Object.entries(OperatorNames),
    ...Object.entries(PunctuationNames),
  ]) {
    if (name) {
      (nameMatchesMap[name] ??= []).push(match);
    }
  }

  const captures: Captures = {};
  let index = 1;
  let match = '';

  for (const [name, matches] of Object.entries(nameMatchesMap)) {
    if (index >= 2) {
      match += '|';
    }

    match += `(${matches
      .map((m) =>
        /^[a-zA-Z$_][a-zA-Z0-9$_]*$/.test(m)
          ? `\\b${escapeRegExpString(m)}\\b`
          : escapeRegExpString(m),
      )
      .join('|')})`;
    captures[index] = { name };
    index++;
  }

  return { match, captures };
};

const identifier = () => {
  return /(?<![a-zA-Z0-9$_])[a-zA-Z$_][a-zA-Z0-9$_]*(?![a-zA-Z0-9$_])/.source;
};

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
          match: `${identifier()}${/(?=\s*(?:\(|(?:=\s*)?\(*:\s*\())/.source}`,
        },
      ],
    },
    Comment: {
      patterns: [
        {
          name: 'comment.block.esp',
          begin: /\/\*/.source,
          beginCaptures: { 0: { name: 'punctuation.definition.comment.esp' } },
          end: /\*\//.source,
          endCaptures: { 0: { name: 'punctuation.definition.comment.esp' } },
        },
        {
          begin: /\/\//.source,
          beginCaptures: { 0: { name: 'comment.line.double-slash.esp' } },
          end: /(?=$)/.source,
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
          match: /\b(?:0|[1-9][0-9]*)(?:\.[0-9]*)?\b/.source,
        },
      ],
    },
    StringEscape: {
      name: 'constant.character.escape.esp',
      match: /\\./.source,
    },
    StringLiteral: {
      patterns: [stringLiteral('single', "'"), stringLiteral('double', '"')],
    },
  },
};
