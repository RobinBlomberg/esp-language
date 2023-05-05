import { parse } from './parse';
import { PatternType } from './pattern-type';

export type Alternation = PatternBase & {
  type: PatternType.Alternation;
  alternatives: Pattern[];
};

export type Any = QuantifiableBase & {
  type: PatternType.Any;
};

export type Character = QuantifiableBase & {
  type: PatternType.Character;
  value: string;
  negated: () => CharacterClass;
};

export type CharacterClass = QuantifiableBase & {
  type: PatternType.CharacterClass;
  isNegated: boolean;
  patterns: (Character | Range | Regex)[];
  negated: () => CharacterClass;
};

export type Concatenation = PatternBase & {
  type: PatternType.Concatenation;
  patterns: Pattern[];
};

export type End = PatternBase & {
  type: PatternType.End;
};

export type Group = QuantifiableBase & {
  type: PatternType.Group;
  capturing: boolean;
  patterns: Pattern[];
};

export type Pattern =
  | Alternation
  | Any
  | Character
  | CharacterClass
  | Concatenation
  | End
  | Group
  | Quantifier
  | Regex
  | Start;

export type PatternBase = {
  capture: () => Group;
  regex: () => RegExp;
};

export type Quantifiable = Any | Character | CharacterClass | Group;

export type QuantifiableBase = {
  oneOrMore: () => Quantifier;
  optional: () => Quantifier;
  repeat: (min: number, max?: number) => Quantifier;
  zeroOrMore: () => Quantifier;
};

export type Quantifier = PatternBase & {
  type: PatternType.Quantifier;
  pattern: Quantifiable;
  min: number;
  max: number;
  isLazy: boolean;
  lazy: () => Quantifier;
};

export type Range = PatternBase & {
  type: PatternType.Range;
  from: string;
  to: string;
  negated: () => CharacterClass;
};

export type Regex = QuantifiableBase & {
  type: PatternType.Regex;
  value: RegExp;
};

export type Start = PatternBase & {
  type: PatternType.Start;
};

export const Alternation = (alternatives: Pattern[]): Alternation => {
  return PatternBase({
    type: PatternType.Alternation,
    alternatives,
  });
};

export const Any = (): Any => {
  return QuantifiableBase({
    type: PatternType.Any,
  });
};

export const Character = (value: string): Character => {
  const self = QuantifiableBase({
    type: PatternType.Character,
    value,
    negated: () => {
      return CharacterClass(true, [self]);
    },
  }) as Character;

  return self;
};

export const CharacterClass = (
  isNegated: boolean,
  patterns: (Character | Range | Regex)[],
): CharacterClass => {
  return QuantifiableBase({
    type: PatternType.CharacterClass,
    isNegated,
    patterns,
    negated: () => {
      return CharacterClass(true, patterns);
    },
  });
};

export const Concatenation = (patterns: Pattern[]): Concatenation => {
  return PatternBase({
    type: PatternType.Concatenation,
    patterns,
  });
};

export const End = (): End => {
  return PatternBase({
    type: PatternType.End,
  });
};

export const Group = (capturing: boolean, patterns: Pattern[]): Group => {
  return QuantifiableBase({
    type: PatternType.Group,
    capturing,
    patterns,
    noncapturing: () => {
      return Group(false, patterns);
    },
  });
};

export const PatternBase = <T extends Record<string, unknown>>(props: T) => {
  const self = {
    ...props,
    capture: () => {
      return Group(true, [self]);
    },
    regex: () => {
      return new RegExp(parse(self));
    },
  } as unknown as Pattern & T;

  return self;
};

export const QuantifiableBase = <T extends Record<string, unknown>>(
  props: T,
) => {
  const self = {
    ...props,
    oneOrMore: () => {
      return Quantifier(self, 1, Infinity, false);
    },
    optional: () => {
      return Quantifier(self, 0, 1, false);
    },
    repeat: (min: number, max?: number) => {
      return Quantifier(self, min, max ?? min, false);
    },
    zeroOrMore: () => {
      return Quantifier(self, 0, Infinity, false);
    },
  } as unknown as Quantifiable & T;

  return self;
};

export const Quantifier = (
  pattern: Quantifiable,
  min: number,
  max: number,
  isLazy: boolean,
): Quantifier => {
  return PatternBase({
    type: PatternType.Quantifier,
    pattern,
    min,
    max,
    isLazy,
    lazy: () => {
      return Quantifier(pattern, min, max, true);
    },
  });
};

export const Range = (from: string, to: string): Range => {
  const self = PatternBase({
    type: PatternType.Range,
    from,
    to,
    negated: () => {
      return CharacterClass(true, [self]);
    },
  }) as Range;

  return self;
};

export const Regex = (value: RegExp): Regex => {
  return QuantifiableBase({
    type: PatternType.Regex,
    value,
  });
};

export const Start = (): Start => {
  return PatternBase({
    type: PatternType.Start,
  });
};
