import { parseScript } from './productions/script';

export const parse = (data: string) => {
  return parseScript(data, 0);
};
