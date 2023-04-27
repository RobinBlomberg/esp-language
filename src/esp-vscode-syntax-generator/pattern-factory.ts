import { Pattern } from './types';

export const include = (id: string) => {
  return {
    include: `#${id}` as const,
  };
};

export const stringLiteral = (
  type: 'double' | 'single',
  quoteChar: string,
): Pattern => {
  return {
    name: `string.quoted.${type}.esp`,
    begin: quoteChar,
    end: quoteChar,
    patterns: [
      {
        name: 'constant.character.escape.esp',
        match: '\\\\.',
      },
    ],
  };
};
