import {
  Alternation,
  Any,
  Character,
  CharacterClass,
  Concatenation,
  End,
  Group,
  Quantifier,
  Range,
  Regex,
  Start,
} from './patterns';
import {
  CharacterClassPatternInput,
  PatternInput,
  QuantifiableInput,
  toPattern,
} from './to-pattern';

export type $ = typeof $;

export const $ = Object.assign(
  <T extends PatternInput>(patternInput: T) => {
    return toPattern(patternInput);
  },
  {
    any: () => {
      return Any();
    },
    capture: (...patternInputs: PatternInput[]) => {
      return Group(true, patternInputs);
    },
    char: (value: string) => {
      return Character(value);
    },
    class: (...patternInputs: CharacterClassPatternInput[]) => {
      return CharacterClass(false, patternInputs);
    },
    concat: (...patternInputs: PatternInput[]) => {
      return Concatenation(patternInputs);
    },
    end: () => {
      return End();
    },
    group: (...patternInputs: PatternInput[]) => {
      return Group(false, patternInputs);
    },
    not: Object.assign(
      (patternInput: CharacterClassPatternInput | string) => {
        if (typeof patternInput === 'string') {
          const patternInputs: Character[] = [];

          for (const character of patternInput) {
            patternInputs.push(Character(character));
          }

          return CharacterClass(true, patternInputs);
        }

        return CharacterClass(true, [toPattern(patternInput)]);
      },
      {
        char: (value: string) => {
          return CharacterClass(true, [Character(value)]);
        },
        charClass: (...patternInputs: CharacterClassPatternInput[]) => {
          return CharacterClass(true, patternInputs);
        },
        range: (from: string, to: string) => {
          return CharacterClass(true, [Range(from, to)]);
        },
      },
    ),
    plus: (pattern: QuantifiableInput) => {
      return Quantifier(pattern, 1, Infinity, false);
    },
    optional: (pattern: QuantifiableInput) => {
      return Quantifier(pattern, 0, 1, false);
    },
    repeat: (pattern: QuantifiableInput, min: number, max?: number) => {
      return Quantifier(pattern, min, max ?? min, false);
    },
    star: (pattern: QuantifiableInput) => {
      return Quantifier(pattern, 0, Infinity, false);
    },
    or: (...patternInputs: PatternInput[]) => {
      return Alternation(patternInputs);
    },
    range: (from: string, to: string) => {
      return Range(from, to);
    },
    regex: (value: RegExp) => {
      return Regex(value);
    },
    start: () => {
      return Start();
    },
    string: (value: string) => {
      const patternInputs: Character[] = [];

      for (const character of value) {
        patternInputs.push(Character(character));
      }

      return Concatenation(patternInputs);
    },
  },
);
