import { compile } from './compile';
import { RegExpPattern } from './patterns/pattern';

export const createRegExp = (...args: [RegExp] | RegExpPattern[]) => {
  return args[0] instanceof RegExp
    ? new RegExp(args[0].source)
    : new RegExp(compile(...(args as RegExpPattern[])));
};

export const createRegExpWithFlags = (
  regex: RegExp | RegExpPattern,
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
    : new RegExp(compile(regex), newFlags);
};
