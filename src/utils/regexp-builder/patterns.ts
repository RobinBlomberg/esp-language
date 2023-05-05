import { parse } from './parse';
import { PatternType } from './pattern-type';
import {
  CharacterClassPatternInput,
  PatternInput,
  QuantifiableInput,
  toPattern,
  toQuantifiable,
} from './to-pattern';

export type Alternation = BasePattern & {
  type: PatternType.Alternation;
  patterns: Pattern[];
};

export type Any = BasePattern & {
  type: PatternType.Any;
};

export type BasePattern = {
  capture: () => Group;
  regex: () => RegExp;
  oneOrMore: () => Quantifier;
  optional: () => Quantifier;
  repeat: (min: number, max?: number) => Quantifier;
  zeroOrMore: () => Quantifier;
};

export type Character = BasePattern & {
  type: PatternType.Character;
  value: string;
  negated: () => CharacterClass;
};

export type CharacterClass = BasePattern & {
  type: PatternType.CharacterClass;
  isNegated: boolean;
  patterns: CharacterClassPattern[];
  negated: () => CharacterClass;
};

export type CharacterClassPattern = Character | Range | Regex;

export type Concatenation = BasePattern & {
  type: PatternType.Concatenation;
  patterns: Pattern[];
};

export type End = BasePattern & {
  type: PatternType.End;
};

export type Group = BasePattern & {
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

export type Quantifiable = Any | Character | CharacterClass | Group;

export type Quantifier = BasePattern & {
  type: PatternType.Quantifier;
  pattern: Quantifiable;
  min: number;
  max: number;
  isLazy: boolean;
  lazy: () => Quantifier;
};

export type Range = BasePattern & {
  type: PatternType.Range;
  from: string;
  to: string;
  negated: () => CharacterClass;
};

export type Regex = BasePattern & {
  type: PatternType.Regex;
  value: RegExp;
};

export type Start = BasePattern & {
  type: PatternType.Start;
};

export const Alternation = (patterns: PatternInput[]): Alternation => {
  return toWithGroupQuantifiable({
    type: PatternType.Alternation,
    patterns: patterns.map(toPattern),
  });
};

export const Any = (): Any => {
  return toWithoutGroupQuantifiable({
    type: PatternType.Any,
  });
};

export const BasePattern = <T extends Record<string, unknown>>(props: T) => {
  const self = {
    ...props,
    capture: () => {
      return Group(true, [self]);
    },
    regex: () => {
      return new RegExp(parse(self));
    },
  } as Pattern & T;

  return self;
};

export const Character = (value: string): Character => {
  const self = toWithoutGroupQuantifiable({
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
  patternInputs: CharacterClassPatternInput[],
): CharacterClass => {
  const patterns = patternInputs.map(toPattern);

  return toWithoutGroupQuantifiable({
    type: PatternType.CharacterClass,
    isNegated,
    patterns,
    negated: () => {
      return CharacterClass(true, patterns);
    },
  });
};

export const Concatenation = (patternInputs: PatternInput[]): Concatenation => {
  return toWithGroupQuantifiable({
    type: PatternType.Concatenation,
    patterns: patternInputs.map(toPattern),
  });
};

export const End = (): End => {
  return toWithGroupQuantifiable({
    type: PatternType.End,
  });
};

export const Group = (
  capturing: boolean,
  patternInputs: PatternInput[],
): Group => {
  const patterns = patternInputs.map(toPattern);

  const self = toWithoutGroupQuantifiable({
    type: PatternType.Group,
    capturing,
    patterns,
    noncapturing: () => {
      return Group(false, patterns);
    },
  }) as Group;

  return self;
};

export const Quantifier = (
  patternInput: QuantifiableInput,
  min: number,
  max: number,
  isLazy: boolean,
): Quantifier => {
  const pattern = toQuantifiable(patternInput);

  return toWithGroupQuantifiable({
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
  const self = toWithGroupQuantifiable({
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
  return toWithoutGroupQuantifiable({
    type: PatternType.Regex,
    value,
  });
};

export const Start = (): Start => {
  return toWithGroupQuantifiable({
    type: PatternType.Start,
  });
};

export const toWithGroupQuantifiable = <T extends Record<string, unknown>>(
  props: T,
) => {
  const self = BasePattern({
    ...props,
    oneOrMore: () => {
      return Quantifier(Group(false, [self]), 1, Infinity, false);
    },
    optional: () => {
      return Quantifier(Group(false, [self]), 0, 1, false);
    },
    repeat: (min: number, max?: number) => {
      return Quantifier(Group(false, [self]), min, max ?? min, false);
    },
    zeroOrMore: () => {
      return Quantifier(Group(false, [self]), 0, Infinity, false);
    },
  });

  return self;
};

export const toWithoutGroupQuantifiable = <T extends Record<string, unknown>>(
  props: T,
) => {
  const self = BasePattern({
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
  }) as Quantifiable & T;

  return self;
};
