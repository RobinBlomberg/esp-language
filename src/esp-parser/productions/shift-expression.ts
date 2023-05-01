import { TokenType } from '../../esp-lexer';
import { createLeftAssociativeBinaryExpressionParser } from '../parser-utils';
import { parseAdditiveExpression } from './additive-expression';

export const parseShiftExpression = createLeftAssociativeBinaryExpressionParser(
  parseAdditiveExpression,
  { [TokenType.Punctuator]: ['<<', '>>', '>>>'] },
);
