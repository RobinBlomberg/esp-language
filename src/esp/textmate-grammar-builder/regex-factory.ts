import {
  any,
  boundary,
  capture,
  concat,
  end,
  lookahead,
  one,
  or,
  RegExpPattern,
} from '../../regexp';
import * as p from './regexp-patterns';
import { ESPScopeSelector } from './scope-selector-factory';
import {
  ConstantKeywordScopeSelectors,
  ControlKeywordScopeSelectors,
  OperatorScopeSelectors,
  PunctuationScopeSelectors,
} from './scope-selectors';
import { TextMate } from './textmate';

export const regex = {
  callIdentifier: () =>
    concat(
      p.identifier,
      lookahead(
        one(/\s/).star(),
        concat(
          or(
            p.callOpenParen,
            p.functionExpressionOperator,
            p.functionDeclarationOperator,
          ),
        ),
      ),
    ).compile(),
  comment: {
    block: {
      begin: () => one('/*').compile(),
      end: () => one('*/').compile(),
    },
    line: {
      begin: () => one('//').compile(),
      end: () => lookahead(end).compile(),
    },
  },
  constant: () => {
    const scopeSelectorValueMap: { [K in ESPScopeSelector]?: string[] } = {};

    for (const [value, scopeSelector] of [
      ...Object.entries(ConstantKeywordScopeSelectors),
      ...Object.entries(ControlKeywordScopeSelectors),
      ...Object.entries(OperatorScopeSelectors),
      ...Object.entries(PunctuationScopeSelectors),
    ]) {
      if (scopeSelector) {
        (scopeSelectorValueMap[scopeSelector] ??= []).push(value);
      }
    }

    const alternatives: RegExpPattern[] = [];
    const captures: TextMate.Captures = {};
    let index = 0;

    for (const [scopeSelector, values] of Object.entries(
      scopeSelectorValueMap,
    )) {
      alternatives.push(
        capture(
          or(
            ...values.map((value) =>
              p.identifier.toRegExp().test(value)
                ? concat(boundary.word, one(value), boundary.word)
                : one(value),
            ),
          ),
        ),
      );

      captures[index + 1] = { name: scopeSelector };
      index++;
    }

    return {
      match: or(...alternatives).compile(),
      captures,
    };
  },
  identifier: () => p.identifier.compile(),
  number: () =>
    concat(
      boundary.word,
      concat(or(one('0'), concat(one(/[1-9]/), one(/\d/).star()))),
      concat(one('.'), one(/\d/).plus()).optional(),
      boundary.word,
    ).compile(),
  stringEscape: () => concat(one('\\'), any).compile(),
};
