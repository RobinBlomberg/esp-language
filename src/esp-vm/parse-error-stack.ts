import { getSourceLocation } from './get-source-location';

type StackFrame = {
  fileName: string | null;
  functionName: string | null;
  index: number;
};

const LOCATION_REGEXP = /(.+?)(?::(\d+))?(?::(\d+))?$/;
const V8_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;

const extractLocation = (urlLike: string) => {
  if (!urlLike.includes(':')) {
    return { fileName: urlLike, lineNumber: null, columnNumber: null };
  }

  const [, fileName = null, lineNumber = null, columnNumber = null] =
    LOCATION_REGEXP.exec(urlLike.replace(/[()]/g, ''))!;
  return { fileName, lineNumber, columnNumber };
};

export type { StackFrame };

/**
 * NOTE: This parser only works with the V8 JavaScript engine.
 * Adapted from the `error-stack-parser` npm module.
 *
 * @see https://github.com/stacktracejs/error-stack-parser
 */
export const parseErrorStack = (
  stack: string,
  sourceFileName: string | undefined,
  sourceMap: [number, number, number][],
  output: string,
) => {
  const filteredLines = stack
    .split('\n')
    .filter((line) => line.match(V8_STACK_REGEXP));
  const stackFrames: StackFrame[] = [];

  for (const line of filteredLines) {
    const sourceLine = line.includes('(eval ')
      ? line
          .replace(/eval code/g, 'eval')
          .replace(/(\(eval at [^()]*)|(,.*$)/g, '')
      : line;

    const sanitizedLine = sourceLine
      .replace(/^\s+/, '')
      .replace(/\(eval code/g, '(')
      .replace(/^.*?\s+/, '');

    const locationMatch = sanitizedLine.match(/ (\(.+\)$)/);

    const sanitizedLineWithoutLocation = locationMatch
      ? sanitizedLine.replace(locationMatch[0], '')
      : sanitizedLine;

    const { fileName, lineNumber, columnNumber } = extractLocation(
      locationMatch ? locationMatch[1]! : sanitizedLineWithoutLocation,
    );

    const sourceLocation = getSourceLocation(
      output,
      Number(lineNumber),
      Number(columnNumber),
      sourceMap,
    );

    if (sourceLocation) {
      stackFrames.push({
        functionName: locationMatch ? sanitizedLineWithoutLocation : null,
        fileName:
          fileName === 'eval' ||
          fileName === '<anonymous>' ||
          fileName === 'evalmachine.<anonymous>'
            ? sourceFileName ?? null
            : fileName ?? null,
        index: sourceLocation.start,
      });
    }
  }

  return stackFrames;
};
