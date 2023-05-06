const createPattern = (name: string) => {
  return () => ({ include: `#${name}` });
};

export type ESPPatternName = keyof typeof pattern;

export const pattern = {
  callIdentifier: createPattern('callIdentifier'),
  comment: createPattern('comment'),
  constant: createPattern('constant'),
  identifier: createPattern('identifier'),
  literal: createPattern('literal'),
  numericLiteral: createPattern('numericLiteral'),
  stringEscape: createPattern('stringEscape'),
  stringLiteral: createPattern('stringLiteral'),
};
