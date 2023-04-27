import { Name } from './names';

export type Captures = {
  [K in number]?: {
    name: string;
  };
};

export type Include = {
  include: `#${string}`;
};

export type Language = {
  name: string;
  patterns: Include[];
  repository: Repository;
  scopeName: string;
};

export type LanguageInput = {
  name: string;
  patterns: Include[];
  repository: RepositoryInput;
  scopeName: string;
};

export type Pattern =
  | Include
  | {
      begin?: string;
      beginCaptures?: Captures;
      captures?: Captures;
      contentName?: string;
      end?: string;
      endCaptures?: Captures;
      match?: string;
      name?: Name;
      patterns?: Pattern[];
    };

export type PatternInput =
  | Include
  | {
      begin?: string | RegExp;
      beginCaptures?: Captures;
      captures?: Captures;
      contentName?: string;
      end?: string | RegExp;
      endCaptures?: Captures;
      match?: string | RegExp;
      name?: Name;
      patterns?: PatternInput[];
    };

export type Repository = {
  [K in string]?: Pattern;
};

export type RepositoryInput = {
  [K in string]?: PatternInput;
};
