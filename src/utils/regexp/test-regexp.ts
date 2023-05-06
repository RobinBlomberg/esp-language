import { createRegExp } from './create-regexp';

export const testRegExp = (
  string: string,
  pattern: RegExp,
  index?: number,
  flags?: string,
) => {
  const regexp = createRegExp(pattern, flags);

  if (index !== undefined) {
    regexp.lastIndex = index;
  }

  return regexp.test(string);
};
