import {
  Alternation,
  Any,
  Character,
  CharacterClass,
  Concatenation,
  End,
  Group,
  Pattern,
  Range,
  Regex,
  Start,
} from './patterns';

export const any = () => {
  return Any();
};

export const capture = (...patterns: Pattern[]) => {
  return Group(true, patterns);
};

export const char = (value: string) => {
  return Character(value);
};

export const charClass = (...patterns: (Character | Range | Regex)[]) => {
  return CharacterClass(false, patterns);
};

export const concat = (...patterns: Pattern[]) => {
  return Concatenation(patterns);
};

export const end = () => {
  return End();
};

export const group = (...patterns: Pattern[]) => {
  return Group(false, patterns);
};

export const not = {
  char: (value: string) => {
    return CharacterClass(true, [Character(value)]);
  },
  charClass: (...patterns: (Character | Range)[]) => {
    return CharacterClass(true, patterns);
  },
  range: (from: string, to: string) => {
    return CharacterClass(true, [Range(from, to)]);
  },
};

export const or = (...alternatives: Pattern[]) => {
  return Alternation(alternatives);
};

export const range = (from: string, to: string) => {
  return Range(from, to);
};

range.charClass = (from: string, to: string) => {
  return CharacterClass(false, [Range(from, to)]);
};

export const regex = (value: RegExp) => {
  return Regex(value);
};

export const start = () => {
  return Start();
};

export const string = (value: string) => {
  const patterns: Character[] = [];

  for (const character of value) {
    patterns.push(Character(character));
  }

  return Concatenation(patterns);
};
