import { syntax } from '../syntax';
import { token } from '../token';

export namespace lexer {
  export type Lexer<T extends token.Token> = (
    d: string,
    s: number,
  ) => T | token.Invalid;

  export const lexIdentifier = <T extends string = string>(
    d: string,
    s: number,
    set?: Set<T>,
  ) => {
    let c = d[s];
    while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
    if (!c || c < 'a' || c > 'z') return token.Invalid(s);

    let v = c;
    let e = s;
    c = d[++e];

    while (c && c >= 'a' && c <= 'z') {
      v += c;
      c = d[++e];
    }

    if (set && !set.has(v)) return token.Invalid(s);

    return token.Identifier(s, e, v as T);
  };

  export const lexNumber: Lexer<token.Number> = (d, s) => {
    let c = d[s];
    while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
    if (!c || c < '0' || c > '9') return token.Invalid(s);

    let v = c;
    let e = s;
    c = d[++e];

    if (v !== '0') {
      while (c && c >= '0' && c <= '9') {
        v += c;
        c = d[++e];
      }
    }

    if (c === '.') {
      v += c;
      c = d[++e];

      while (c && c >= '0' && c <= '9') {
        v += c;
        c = d[++e];
      }
    }

    return token.Number(s, e, v);
  };

  export const lexPunctuator = <
    T extends syntax.Punctuator = syntax.Punctuator,
  >(
    d: string,
    s: number,
    set: Set<T> = syntax.punctuatorSet as Set<T>,
  ) => {
    let v = d[s];
    while (v === ' ' || v === '\t' || v === '\n' || v === '\r') v = d[++s];
    if (!v || !set.has(v)) return token.Invalid(s);

    let e = s;

    while (true) {
      const c = d[e + 1];
      if (!c || !set.has(v + c)) break;
      v += c;
      e++;
    }

    return token.Punctuator(s, e + 1, v as T);
  };

  export const lexString: Lexer<token.String> = (d, s) => {
    let c = d[s];
    while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
    if (!c || c !== "'") return token.Invalid(s);

    let v = c;
    let e = s;
    c = d[++e];

    while (c && c !== "'") {
      if (c === '\\') {
        v += c;
        c = d[++e];
        if (!c) return token.Invalid(s);
      }

      v += c;
      c = d[++e];
    }

    if (!c) return token.Invalid(s);
    v += c;
    ++e;

    return token.String(s, e, v);
  };

  export const lexUnaryOperator: Lexer<token.UnaryOperator> = (d, s) => {
    return lexPunctuator(d, s, syntax.unaryOperatorSet);
  };

  export const lexBinaryOperator: Lexer<token.BinaryOperator> = (d, s) => {
    return lexPunctuator(d, s, syntax.binaryOperatorSet);
  };

  export const lexControlKeyword: Lexer<token.ControlKeyword> = (d, s) => {
    return lexIdentifier(d, s, syntax.controlKeywordSet);
  };
}
