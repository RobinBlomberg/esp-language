import { escapeRegExpString } from './escape-regexp-string';
import { Name } from './names';
import {
  constantKeywordNames,
  controlKeywordNames,
  operatorNames,
  punctuationNames,
} from './semantic-names';
import { Captures, Pattern } from './types';

export const constant = (): Pattern => {
  const nameMatchesMap: { [K in Name]?: string[] } = {};

  for (const [match, name] of [
    ...Object.entries(constantKeywordNames),
    ...Object.entries(controlKeywordNames),
    ...Object.entries(operatorNames),
    ...Object.entries(punctuationNames),
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

export const identifier = () => {
  return '(?<![a-zA-Z0-9$_])[a-zA-Z$_][a-zA-Z0-9$_]*(?![a-zA-Z0-9$_])';
};

export const include = (id: string) => {
  return {
    include: `#${id}` as const,
  };
};

export const stringLiteral = (
  type: 'double' | 'single',
  quoteChar: string,
): Pattern => {
  return {
    name: `string.quoted.${type}.esp`,
    begin: quoteChar,
    beginCaptures: {
      0: { name: 'punctuation.definition.string.begin.esp' },
    },
    end: `(${escapeRegExpString(quoteChar)})|((?:[^\\\\\\n])$)`,
    endCaptures: {
      1: { name: 'punctuation.definition.string.end.esp' },
      2: { name: 'invalid.illegal.newline.esp' },
    },
    patterns: [include('StringEscape')],
  };
};
