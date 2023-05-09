import { cst } from '../cst';
import { lexer } from '../lexer';

export namespace parser {
  export type Parser<T extends cst.Node, U extends unknown[] = []> = (
    data: string,
    start: number,
    ...args: U
  ) => T | cst.Invalid;

  export const parsePrimaryExpression: Parser<cst.Expression> = (d, s) => {
    const number = lexer.lexNumber(d, s);
    if (number.v) {
      return cst.NumberLiteral(number.s, number.e, Number(number.v));
    }

    const string = lexer.lexString(d, s);
    if (string.v) return cst.StringLiteral(string.s, string.e, string.v);

    const name = lexer.lexIdentifier(d, s);
    switch (name.v) {
      case undefined:
        return cst.invalid(name);
      case 'false':
      case 'true':
        return cst.BooleanLiteral(name.s, name.e, name.v === 'true');
      default:
        return cst.Identifier(name.s, name.e, name.v);
    }
  };

  export const parseUnaryExpression: Parser<cst.Expression> = (d, s) => {
    const operator = lexer.lexUnaryOperator(d, s);

    const argument = parsePrimaryExpression(d, operator.e);
    if (!argument.v) return cst.invalid(argument);

    return operator.v
      ? cst.UnaryExpression(operator.s, argument.e, operator, argument)
      : argument;
  };

  export const parseBinaryExpression: Parser<cst.Expression> = (d, s) => {
    const left = parseUnaryExpression(d, s);
    if (!left.v) return cst.invalid(left);

    const operator = lexer.lexBinaryOperator(d, left.e);
    if (!operator.v) return left;

    const right = parseUnaryExpression(d, operator.e);
    if (!right.v) return cst.invalid(right);

    return cst.BinaryExpression(left.s, right.e, left, operator, right);
  };

  export const parseConsequentExpression: Parser<cst.Expression> = (d, s) => {
    const identifier = lexer.lexIdentifier(d, s);
    switch (identifier.v) {
      case 'return': {
        const argument = parseBinaryExpression(d, identifier.e);
        if (!argument.v) return cst.Invalid(s);

        return cst.ReturnExpression(identifier.s, argument.e, argument);
      }
      case 'throw': {
        const argument = parseBinaryExpression(d, identifier.e);
        if (!argument.v) return cst.Invalid(s);

        return cst.ThrowExpression(identifier.s, argument.e, argument);
      }
      default:
        return parseBinaryExpression(d, s);
    }
  };
}
