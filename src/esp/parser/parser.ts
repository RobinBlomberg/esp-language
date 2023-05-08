import {
  BinaryExpression,
  BinaryOperator,
  BooleanLiteral,
  Expression,
  Identifier,
  IdentifierName,
  Invalid,
  Node,
  NumberLiteral,
  StringLiteral,
  UnaryExpression,
  UnaryOperator,
  invalid,
} from './nodes';

export type Parser<T extends Node> = (
  data: string,
  start: number,
) => T | Invalid;

export const parseBinaryOperator: Parser<BinaryOperator> = (d, s) => {
  let c = d[s];
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
  if (!c || (c !== '+' && c !== '-')) return Invalid(s);

  return BinaryOperator(s, s + 1, c);
};

export const parseIdentifierName: Parser<IdentifierName> = (d, s) => {
  let c = d[s];
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
  if (!c || c < 'a' || c > 'z') return Invalid(s);

  let v = c;
  let e = s;
  c = d[++e];

  while (c && c >= 'a' && c <= 'z') {
    v += c;
    c = d[++e];
  }

  return IdentifierName(s, e, v);
};

export const parseNumberLiteral: Parser<NumberLiteral> = (d, s) => {
  let c = d[s];
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
  if (!c || c < '0' || c > '9') return Invalid(s);

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

  return NumberLiteral(s, e, Number(v));
};

export const parseStringLiteral: Parser<StringLiteral> = (d, s) => {
  let c = d[s];
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
  if (!c || c !== "'") return Invalid(s);

  let v = '';
  let e = s;
  c = d[++e];

  while (c && c !== "'") {
    if (c === '\\') {
      c = d[++e];
      if (!c) return Invalid(s);
    }

    v += c;
    c = d[++e];
  }

  if (!c) return Invalid(s);
  ++e;

  return StringLiteral(s, e, v);
};

export const parseUnaryOperator: Parser<UnaryOperator> = (d, s) => {
  let c = d[s];
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') c = d[++s];
  if (!c || c !== '-') return Invalid(s);

  return UnaryOperator(s, s + 1, c);
};

export const parseBooleanLiteral: Parser<BooleanLiteral> = (d, s) => {
  const name = parseIdentifierName(d, s);
  if (name.v !== 'true' && name.v !== 'false') return invalid(name);

  return BooleanLiteral(name.s, name.e, name.v === 'true');
};

export const parseIdentifier: Parser<Identifier> = (d, s) => {
  const name = parseIdentifierName(d, s);
  if (!name.v) return invalid(name);

  return Identifier(name.s, name.e, name.v);
};

export const parseUnaryExpression: Parser<Expression> = (d, s) => {
  const operator = parseUnaryOperator(d, s);

  const argument = parseIdentifier(d, operator.e);
  if (!argument.v) return invalid(argument);

  return operator.v
    ? UnaryExpression(operator.s, argument.e, operator, argument)
    : argument;
};

export const parseBinaryExpression: Parser<Expression> = (d, s) => {
  const left = parseUnaryExpression(d, s);
  if (!left.v) return invalid(left);

  const operator = parseBinaryOperator(d, left.e);
  if (!operator.v) return left;

  const right = parseUnaryExpression(d, operator.e);
  if (!right.v) return invalid(right);

  return BinaryExpression(left.s, right.e, left, operator, right);
};
