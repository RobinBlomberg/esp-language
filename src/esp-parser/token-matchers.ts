import { TokenMatcher, TokenType } from '../esp-lexer';
import { AssignmentOperator, UnaryOperator, UpdateOperator } from './ast';

export const AssignmentOperatorTokenMatcher: TokenMatcher<AssignmentOperator> =
  {
    [TokenType.Punctuator]: [
      '=',
      '*=',
      '/=',
      '%=',
      '+=',
      '-=',
      '<<=',
      '>>=',
      '>>>=',
      '&=',
      '^=',
      '|=',
      '**=',
      '&&=',
      '||=',
    ],
  };

export const UnaryOperatorTokenMatcher: TokenMatcher<UnaryOperator> = {
  [TokenType.Punctuator]: ['-', '!'],
};

export const UpdateOperatorTokenMatcher: TokenMatcher<UpdateOperator> = {
  [TokenType.Punctuator]: UpdateOperator,
};
