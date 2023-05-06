export namespace TextMate {
  export type Captures = {
    [K in number]?: {
      name: string;
    };
  };

  export type Include = {
    include: string;
  };

  export type Language = {
    name: string;
    patterns: Include[];
    repository: Repository;
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
        name?: string;
        patterns?: Pattern[];
      };

  export type Repository = {
    [K in string]?: Pattern;
  };
}
