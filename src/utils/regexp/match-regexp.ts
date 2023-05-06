import { createRegExpWithFlags } from './create-regexp';

export type RegExpExecArrayWithIndices = RegExpExecArray & {
  indices: [number, number][] & {
    groups: Record<string, [number, number]>;
  };
};

export type RegExpMatchResult = {
  match: string;
  index: number;
  indices: [number, number];
  captures: (string | undefined)[];
  captureIndices: ([number, number] | undefined)[];
  groups: Record<string, string | undefined>;
  groupIndices: Record<string, [number, number]>;
};

export const matchRegExp = (
  string: string,
  regex: RegExp,
  index?: number,
  flags?: string,
): RegExpMatchResult | null => {
  const regexp = createRegExpWithFlags(regex, flags);

  if (index !== undefined) {
    regexp.lastIndex = index;
  }

  const result = regexp.exec(string) as RegExpExecArrayWithIndices | null;

  if (!result) {
    return null;
  }

  return {
    match: result[0],
    index: result.index,
    indices: result.indices?.[0]!,
    captures: result.slice(1),
    captureIndices: result.indices?.slice(1) ?? [],
    groups: { ...result.groups },
    groupIndices: { ...result.indices?.groups },
  };
};
