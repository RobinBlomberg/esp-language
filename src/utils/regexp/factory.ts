import {
  any,
  boundary,
  capture,
  concat,
  end,
  group,
  lookahead,
  lookbehind,
  one,
  or,
  ref,
  repeat,
  start,
} from './factories';
import { CharacterSequence } from './patterns/character-sequence';

export type _ = typeof _;

export const _ = (character: string | RegExp) => {
  return new CharacterSequence(character);
};

_.any = any;
_.boundary = boundary;
_.capture = capture;
_.concat = concat;
_.end = end;
_.group = group;
_.lookahead = lookahead;
_.lookbehind = lookbehind;
_.one = one;
_.or = or;
_.ref = ref;
_.repeat = repeat;
_.start = start;
