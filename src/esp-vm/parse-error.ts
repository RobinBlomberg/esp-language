import { parseErrorStack } from './parse-error-stack';

export const parseError = (
  error: unknown,
  sourcePath: string | undefined,
  sourceMap: [number, number, number][],
  output: string,
) => {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : '';

  const name =
    'name' in error && typeof error.name === 'string' ? error.name : 'Error';

  const stack =
    'stack' in error && typeof error.stack === 'string'
      ? parseErrorStack(error.stack, sourcePath, sourceMap, output)
      : [];

  return { message, name, stack };
};
