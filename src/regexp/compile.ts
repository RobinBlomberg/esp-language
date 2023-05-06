import { PatternType } from './pattern-type';
import { CHARACTER_REGEXP, RegExpPattern } from './patterns';

const compileChild = (pattern: RegExpPattern): string => {
  return mustChildBeParenthesized(pattern)
    ? `(?:${compile(pattern)})`
    : compile(pattern);
};

const mustChildBeParenthesized = (pattern: RegExpPattern) => {
  switch (pattern.type) {
    case PatternType.CharacterSequence:
      return typeof pattern.value === 'string'
        ? pattern.value.length >= 2
        : !CHARACTER_REGEXP.test(pattern.value.source);
    case PatternType.Concatenation:
    case PatternType.Disjunction:
      return true;
    default:
      return false;
  }
};

export const compile = (...patterns: RegExpPattern[]): string => {
  let output = '';

  for (const pattern of patterns) {
    switch (pattern.type) {
      case PatternType.Backreference:
        if (typeof pattern.id === 'number') {
          output += `\\${pattern.id}`;
        } else {
          output += `\\k<${pattern.id}>`;
        }
        break;
      case PatternType.BoundaryAssertion:
        switch (pattern.kind) {
          case 'End':
            output += '$';
            break;
          case 'NonWord':
            output += '\\B';
            break;
          case 'Start':
            output += '^';
            break;
          case 'Word':
            output += '\\b';
            break;
        }
        break;
      case PatternType.CapturingGroup:
        output += '(';

        if (pattern.groupName) {
          output += `?<${pattern.groupName}>`;
        }

        for (const element of pattern.elements) {
          output += compileChild(element);
        }

        output += ')';
        break;
      case PatternType.CharacterSequence:
        if (typeof pattern.value === 'string') {
          for (const character of pattern.value) {
            switch (character) {
              case '?':
              case '.':
              case '(':
              case ')':
              case '[':
              case ']':
              case '{':
              case '}':
              case '*':
              case '\\':
              case '^':
              case '+':
              case '|':
              case '$':
                output += `\\${character}`;
                break;
              default:
                output += character;
            }
          }
        } else {
          output += pattern.value.source;
        }
        break;
      case PatternType.Concatenation:
        for (const element of pattern.elements) {
          output += compileChild(element);
        }
        break;
      case PatternType.Disjunction:
        for (let i = 0; i < pattern.alternatives.length; i++) {
          if (i >= 1) {
            output += '|';
          }

          output += compileChild(pattern.alternatives[i]!);
        }
        break;
      case PatternType.LookaroundAssertion:
        output += '(?';

        if (pattern.lookbehind) {
          output += '<';
        }

        output += pattern.negative ? '!' : '=';

        for (const element of pattern.elements) {
          output += compileChild(element);
        }

        output += ')';
        break;
      case PatternType.Quantifier:
        output += compileChild(pattern.pattern);

        if (pattern.minCount === 0 && pattern.maxCount === 1) {
          output += '?';
        } else if (pattern.minCount === 0 && pattern.maxCount === Infinity) {
          output += '*';
        } else if (pattern.minCount === 1 && pattern.maxCount === Infinity) {
          output += '+';
        } else if (pattern.minCount === pattern.maxCount) {
          output += pattern.minCount === 1 ? '' : `{${pattern.minCount}}`;
        } else if (pattern.maxCount === Infinity) {
          output += `{${pattern.minCount},}`;
        } else {
          output += `{${pattern.minCount},${pattern.maxCount}}`;
        }

        if (pattern.isLazy) {
          output += '?';
        }

        break;
    }
  }

  return output;
};
