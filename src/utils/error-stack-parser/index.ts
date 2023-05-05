const INTEGER_REGEXP = /^0|[1-9][0-9]*$/;
const STACK_FRAME_REGEXP =
  /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/;

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
  const matches = stackFrame.match(STACK_FRAME_REGEXP);

  if (matches) {
    const [, functionName, fileName, lineNumber, columnNumber] = matches;

    return {
      functionName: functionName || null,
      fileName: parseFileName(fileName),
      lineNumber: parseInteger(lineNumber),
      columnNumber: parseInteger(columnNumber),
    };
  }

  return null;
};
