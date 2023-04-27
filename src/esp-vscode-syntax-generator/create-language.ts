import { escapeRegExpString } from '../escape-regexp-string';
import {
  Language,
  LanguageInput,
  Pattern,
  PatternInput,
  Repository,
  RepositoryInput,
} from './types';

// TODO: Delete this helper?
const createPattern = (input: PatternInput): Pattern => {
  if ('include' in input) {
    return input;
  }

  const {
    begin,
    beginCaptures,
    captures,
    contentName,
    end,
    endCaptures,
    match,
    name,
    patterns,
  } = input;

  return {
    ...(begin === undefined
      ? {}
      : {
          begin:
            typeof begin === 'string'
              ? begin
              : escapeRegExpString(begin.source),
        }),
    ...(beginCaptures === undefined ? {} : { beginCaptures }),
    ...(captures === undefined ? {} : { captures }),
    ...(contentName === undefined ? {} : { contentName }),
    ...(end === undefined
      ? {}
      : {
          end: typeof end === 'string' ? end : escapeRegExpString(end.source),
        }),
    ...(endCaptures === undefined ? {} : { endCaptures }),
    ...(match === undefined
      ? {}
      : {
          match:
            typeof match === 'string'
              ? match
              : escapeRegExpString(match.source),
        }),
    ...(name === undefined ? {} : { name }),
    ...(patterns === undefined
      ? {}
      : { patterns: patterns.map(createPattern) }),
  };
};

const createRepository = (input: RepositoryInput): Repository => {
  const repository: Repository = {};

  for (const [key, value] of Object.entries(input)) {
    repository[key] = createPattern(value!);
  }

  return repository;
};

export const createLanguage = (input: LanguageInput): Language => {
  return {
    name: input.name,
    patterns: input.patterns,
    repository: createRepository(input.repository),
    scopeName: input.scopeName,
  };
};
