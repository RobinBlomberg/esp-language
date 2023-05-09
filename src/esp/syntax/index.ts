export namespace syntax {
  export enum BinaryOperator {
    Minus = '-',
    Plus = '+',
  }

  export enum ConstantKeyword {
    False = 'false',
    True = 'true',
  }

  export enum ControlKeyword {
    Return = 'return',
    Throw = 'throw',
  }

  export enum Punctuation {
    Escape = '\\',
    Terminator = ';',
  }

  export enum UnaryOperator {
    Negate = '-',
    Not = '!',
  }

  export type Operator = (typeof operatorList)[number];

  export type Punctuator = (typeof punctuatorList)[number];

  export type Keyword = (typeof keywordList)[number];

  export const operator = {
    binary: BinaryOperator,
    unary: UnaryOperator,
  };

  export const unaryOperatorSet = new Set(Object.values(operator.unary));

  export const unaryOperatorList = [...unaryOperatorSet];

  export const binaryOperatorSet = new Set(Object.values(operator.binary));

  export const binaryOperatorList = [...binaryOperatorSet];

  export const operatorSet = new Set([
    ...unaryOperatorList,
    ...binaryOperatorList,
  ]);

  export const operatorList = [...operatorSet];

  export const punctuation = Punctuation;

  export const punctuationSet = new Set(Object.values(punctuation));

  export const punctuationList = [...punctuationSet];

  export const punctuatorSet = new Set([
    ...unaryOperatorList,
    ...binaryOperatorList,
    ...punctuationList,
  ]);

  export const punctuatorList = [...punctuatorSet];

  export const keyword = {
    constant: ConstantKeyword,
    control: ControlKeyword,
  };

  export const constantKeywordSet = new Set(Object.values(keyword.constant));

  export const constantKeywordList = [...constantKeywordSet];

  export const controlKeywordSet = new Set(Object.values(keyword.control));

  export const controlKeywordList = [...controlKeywordSet];

  export const keywordSet = new Set([
    ...constantKeywordList,
    ...controlKeywordList,
  ]);

  export const keywordList = [...keywordSet];
}
