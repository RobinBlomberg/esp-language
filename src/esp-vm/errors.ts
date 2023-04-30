import { parseError } from './parse-error';
import { StackFrame } from './parse-error-stack';

export type Error = {
  message: string;
  name: string;
  stack: StackFrame[];
  start: number;
  end: number;
};

export const createRuntimeError = (
  error: unknown,
  sourceFileName: string | undefined,
  sourceMap: [number, number, number][],
  output: string,
): Error | null => {
  const parsedError = parseError(error, sourceFileName, sourceMap, output);
  const stackFrame = parsedError?.stack[0];

  if (!stackFrame) {
    return null;
  }

  return {
    message: parsedError.message,
    name: parsedError.name,
    stack: parsedError.stack,
    start: stackFrame.index,
    end: stackFrame.index,
  };
};

export const createSyntaxError = (
  source: string,
  sourceFileName: string | undefined,
  errorStart: number,
  errorEnd: number,
): Error => {
  const errorMessage =
    errorStart < source.length
      ? `Invalid or unexpected token ${JSON.stringify(
          source.slice(errorStart, errorEnd),
        )}`
      : 'Unexpected end of input';

  return {
    message: errorMessage,
    name: 'SyntaxError',
    stack: sourceFileName
      ? [{ fileName: sourceFileName, functionName: null, index: errorStart }]
      : [],
    start: errorStart,
    end: errorEnd,
  };
};
