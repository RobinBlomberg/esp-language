import { BoundaryType } from './boundary-type';
import { Backreference } from './patterns/backreference';
import { BoundaryAssertion } from './patterns/boundary-assertion';
import { CapturingGroup } from './patterns/capturing-group';
import { CharacterSequence } from './patterns/character-sequence';
import { Concatenation } from './patterns/concatenation';
import { Disjunction } from './patterns/disjunction';
import { LookaroundAssertion } from './patterns/lookaround-assertion';
import { NonCapturingGroup } from './patterns/non-capturing-group';
import { RegExpPattern } from './patterns/pattern';
import { Quantifier } from './patterns/quantifier';

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

export const group = (...elements: RegExpPattern[]) => {
  return new NonCapturingGroup(elements);
};

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
