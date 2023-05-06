import { toArray } from '../util';
import { compile } from './compile';
import { RegExpPattern } from './patterns/pattern';

export const createRegExp = (
  regex: RegExp | RegExpPattern | RegExpPattern[],
  flags?: string,
) => {
  let newFlags;

  if (regex instanceof RegExp) {
    newFlags = flags ?? regex.flags;

    if (!regex.flags.includes('d')) {
      newFlags += 'd';
    }

    if (!regex.flags.includes('g')) {
      newFlags += 'g';
    }
  } else {
    newFlags = flags;
  }

  return regex instanceof RegExp
    ? new RegExp(regex.source, newFlags)
    : new RegExp(compile(...toArray(regex)), newFlags);
};
