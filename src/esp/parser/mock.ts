import { cst } from '../cst';
import { token } from '../token';

export namespace mock {
  export type MockFactory<T extends Node = Node> = {
    data: string;
    node: (s?: number) => T;
  };

  export type MockFactoryPart = Node | { s: number; e: number; v: string };

  export type Node = token.Token | cst.Node;

  export type Token = string | MockFactory;

  export type TokensToParts<T extends readonly Token[]> = {
    [K in keyof T]: T[K] extends string
      ? { s: number; e: number; v: T[K] }
      : T[K] extends MockFactory<infer U>
      ? U
      : never;
  };

  export const createMockFactory = <T extends readonly Token[], U extends Node>(
    tokens: T,
    createNode: (parts: TokensToParts<T>) => U,
  ): MockFactory<U> => {
    let data = '';

    for (const t of tokens) {
      if (typeof t === 'string') {
        data += t;
      } else {
        data += t.data;
      }
    }

    return {
      data,
      node: (s = 0) => {
        const parts: MockFactoryPart[] = [];

        for (const v of tokens) {
          if (typeof v === 'string') {
            const e: number = s + v.length;
            parts.push({ s, e, v });
            s = e;
          } else {
            const part = v.node(s);
            parts.push(part);
            s = part.e;
          }
        }

        return createNode(parts as TokensToParts<T>);
      },
    };
  };

  export const unaryOp = createMockFactory(['-'] as const, ([op]) =>
    token.UnaryOperator(op.s, op.e, op.v),
  );

  export const binaryOp = createMockFactory(['+'] as const, ([op]) =>
    token.BinaryOperator(op.s, op.e, op.v),
  );

  export const invalid = createMockFactory(['¤'] as const, ([value]) =>
    cst.Invalid(value.s),
  );

  export const number = createMockFactory(['0'] as const, ([value]) =>
    cst.NumberLiteral(value.s, value.e, 0),
  );

  export const string = createMockFactory(["''"] as const, ([value]) =>
    cst.StringLiteral(value.s, value.e, ''),
  );

  export const bool = createMockFactory(['true'] as const, ([value]) =>
    cst.BooleanLiteral(value.s, value.e, true),
  );

  export const id = createMockFactory(['a'] as const, ([name]) =>
    cst.Identifier(name.s, name.e, name.v),
  );

  export const primary = id;

  export const unary = createMockFactory(
    [unaryOp, id] as const,
    ([operator, argument]) =>
      cst.UnaryExpression(operator.s, argument.e, operator, argument),
  );

  export const binary = createMockFactory(
    [unary, binaryOp, unary] as const,
    ([left, operator, right]) =>
      cst.BinaryExpression(left.s, right.e, left, operator, right),
  );

  export const returnKeyword = createMockFactory(
    ['return'] as const,
    ([value]) => token.ReturnKeyword(value.s, value.e),
  );

  export const returning = createMockFactory(
    [returnKeyword, binary] as const,
    ([keyword, argument]) =>
      cst.ReturnExpression(keyword.s, argument.e, keyword, argument),
  );

  export const throwKeyword = createMockFactory(['throw'] as const, ([value]) =>
    token.ThrowKeyword(value.s, value.e),
  );

  export const throwing = createMockFactory(
    [throwKeyword, binary] as const,
    ([keyword, argument]) =>
      cst.ThrowExpression(keyword.s, argument.e, keyword, argument),
  );
}
