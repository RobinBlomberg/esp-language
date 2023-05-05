import { PatternType } from './pattern-type';
import { Pattern } from './patterns';

export const parse = (pattern: Pattern): string => {
  switch (pattern.type) {
    case PatternType.Alternation: {
      let output = '';

      for (let i = 0; i < pattern.patterns.length; i++) {
        if (i >= 1) {
          output += '|';
        }

        output += parse(pattern.patterns[i]!);
      }

      return output;
    }
    case PatternType.Any:
      return '.';
    case PatternType.Character:
      return pattern.value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    case PatternType.CharacterClass: {
      let output = '[';

      if (pattern.isNegated) {
        output += '^';
      }

      for (const child of pattern.patterns) {
        if (child.type === 'Character') {
          output += child.value;
        } else if (child.type === 'Range') {
          output += child.from.replace(/-/g, '\\-');
          output += '-';
          output += child.to.replace(/-/g, '\\-');
        } else {
          output += parse(child);
        }
      }

      output += ']';

      return output;
    }
    case PatternType.Concatenation: {
      let output = '';

      for (const child of pattern.patterns) {
        output += parse(child);
      }

      return output;
    }
    case PatternType.End:
      return '$';
    case PatternType.Group: {
      let output = '(';

      if (!pattern.capturing) {
        output += '?:';
      }

      for (const child of pattern.patterns) {
        output += parse(child);
      }

      output += ')';

      return output;
    }
    case PatternType.Quantifier: {
      if (pattern.max === 0) {
        return '';
      }

      let output = parse(pattern.pattern);

      if (pattern.min === 0) {
        if (pattern.max === 1) {
          output += '?';
        } else if (pattern.max === Infinity) {
          output += '*';
        } else {
          output += `{0,${pattern.max}}`;
        }
      } else if (pattern.min === 1) {
        if (pattern.max === 1) {
          return output;
        } else if (pattern.max === Infinity) {
          output += '+';
        } else {
          output += `{1,${pattern.max}}`;
        }
      } else if (pattern.min === pattern.max) {
        output += `{${pattern.min}}`;
      } else {
        output += `{${pattern.min},${pattern.max}}`;
      }

      if (pattern.isLazy) {
        output += '?';
      }

      return output;
    }
    case PatternType.Regex:
      return pattern.value.source;
    case PatternType.Start:
      return '^';
  }
};
