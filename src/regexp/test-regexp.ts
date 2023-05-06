import { createRegExpWithFlags } from './create-regexp';

export const testRegExp = (
  string: string,
  regex: RegExp,
  index?: number,
  flags?: string,
) => {
  const regexp = createRegExpWithFlags(regex, flags);

  if (index !== undefined) {
    regexp.lastIndex = index;
  }

  return regexp.test(string);
};
