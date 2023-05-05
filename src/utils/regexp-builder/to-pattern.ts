import {
  Character,
  Concatenation,
  Group,
  Pattern,
  Quantifiable,
  Range,
  Regex,
} from './patterns';

export type CharacterClassPatternInput =
  | Character
  | Range
  | Regex
  | string
  | RegExp;

export type PatternInput = Pattern | string | RegExp;

export type QuantifiableInput = Quantifiable | string | RegExp;

export type ToCharacterClassPattern<T extends PatternInput | Range> = T extends
  | Pattern
  | Range
  ? T
  : T extends string
  ? Character | Character[]
  : Regex;

export type ToPattern<T extends PatternInput | Range> = T extends
  | Pattern
  | Range
  ? T
  : T extends string
  ? Character | Concatenation
  : Regex;

export type ToQuantifiable<T extends PatternInput> = T extends Pattern | Range
  ? T
  : Group;

export const toCharacterClassPattern = <T extends PatternInput | Range>(
  input: T,
) => {
  if (typeof input === 'string') {
    if (input.length === 1) {
      return Character(input) as ToCharacterClassPattern<T>;
    }

    const patterns: Character[] = [];

    for (const character of input) {
      patterns.push(Character(character));
    }

    return patterns;
  }

  if (input instanceof RegExp) {
    return Regex(input) as ToCharacterClassPattern<T>;
  }

  return input as ToCharacterClassPattern<T>;
};

export const toPattern = <T extends PatternInput | Range>(input: T) => {
  if (typeof input === 'string') {
    if (input.length === 1) {
      return Character(input) as ToPattern<T>;
    }

    const patterns: Character[] = [];

    for (const character of input) {
      patterns.push(Character(character));
    }

    return Concatenation(patterns) as ToPattern<T>;
  }

  if (input instanceof RegExp) {
    return Regex(input) as ToPattern<T>;
  }

  return input as ToPattern<T>;
};

export const toQuantifiable = <T extends PatternInput>(input: T) => {
  if (typeof input === 'string') {
    if (input.length === 1) {
      return Character(input) as ToQuantifiable<T>;
    }

    const patterns: Character[] = [];

    for (const character of input) {
      patterns.push(Character(character));
    }

    return Group(false, [Concatenation(patterns)]) as ToQuantifiable<T>;
  }

  if (input instanceof RegExp) {
    return Group(false, [Regex(input)]) as ToQuantifiable<T>;
  }

  return input as ToQuantifiable<T>;
};
