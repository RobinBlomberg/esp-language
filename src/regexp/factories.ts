import { BoundaryType } from './boundary-type';
import {
  Backreference,
  BoundaryAssertion,
  CapturingGroup,
  CharacterSequence,
  Concatenation,
  Disjunction,
  LookaroundAssertion,
  Quantifier,
  RegExpPattern,
} from './patterns';

export const any = new CharacterSequence(/./);

export const boundary = {
  nonword: new BoundaryAssertion(BoundaryType.NonWord),
  word: new BoundaryAssertion(BoundaryType.Word),
};

export const capture = (...elements: RegExpPattern[]) => {
  return new CapturingGroup(null, elements);
};

export const concat = (...elements: RegExpPattern[]) => {
  return new Concatenation(elements);
};

export const end = new BoundaryAssertion(BoundaryType.End);

export const lookahead = (...elements: RegExpPattern[]) => {
  return new LookaroundAssertion(false, false, elements);
};

lookahead.not = (...elements: RegExpPattern[]) => {
  return new LookaroundAssertion(true, false, elements);
};

export const lookbehind = (...elements: RegExpPattern[]) => {
  return new LookaroundAssertion(false, true, elements);
};

lookbehind.not = (...elements: RegExpPattern[]) => {
  return new LookaroundAssertion(true, true, elements);
};

export const one = (value: string | RegExp) => {
  return new CharacterSequence(value);
};

export const or = (...alternatives: RegExpPattern[]) => {
  return new Disjunction(alternatives);
};

export const ref = (id: number | string) => {
  return new Backreference(id);
};

export const repeat = (
  pattern: RegExpPattern,
  minCount: number,
  maxCount = minCount,
) => {
  return new Quantifier(pattern, minCount, maxCount, false);
};

export const start = new BoundaryAssertion(BoundaryType.Start);
