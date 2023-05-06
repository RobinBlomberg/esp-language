import { matchRegExp } from '../regexp';
import { INTEGER_REGEXP, STACK_FRAME_REGEXP } from './regexes';

const parseFileName = (fileName: string | undefined) => {
  if (!fileName) {
    return null;
  }

  if (fileName.startsWith('file:///')) {
    fileName = fileName.slice(8);
  }

  fileName = fileName.replace(/\\/g, '/');

  return fileName;
};

const parseInteger = (string: string | undefined) => {
  return string && INTEGER_REGEXP.test(string) ? parseInt(string, 10) : null;
};

export type StackFrame = {
  functionName: string | null;
  fileName: string | null;
  lineNumber: number | null;
  columnNumber: number | null;
};

export const parseErrorStack = (stack: string) => {
  const lines = stack.split('\n');
  const stackFrames: StackFrame[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!;
    const stackFrame = parseStackFrame(line);

    if (stackFrame) {
      stackFrames.push(stackFrame);
    }
  }

  return stackFrames;
};

export const parseStackFrame = (stackFrame: string) => {
  const match = matchRegExp(stackFrame, STACK_FRAME_REGEXP);

  if (match) {
    const { functionName, fileName, lineNumber, columnNumber } = match.groups;

    return {
      functionName: functionName ?? null,
      fileName: parseFileName(fileName),
      lineNumber: parseInteger(lineNumber),
      columnNumber: parseInteger(columnNumber),
    };
  }

  return null;
};
