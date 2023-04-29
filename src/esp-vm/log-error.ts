import { black, clear, red } from '../ansi-escape-codes';
import { Error } from './errors';
import { indexToPosition } from './index-position-converter';

export const logError = (
  error: Error,
  source: string,
  sourcePath: string | undefined,
) => {
  let line = 1;
  let column = 1;
  let lineStart = 0;
  let lineEnd = source.length;

  for (let i = 0; i < source.length; i++) {
    if (source[i] === '\n' || (source[i] === '\r' && source[i + 1] !== '\n')) {
      if (i > error.start) {
        lineEnd = i;
        break;
      }

      line++;
      column = 1;
      lineStart = i + 1;
    } else if (i < error.start) {
      column++;
    }
  }

  if (sourcePath) {
    console.error(`${sourcePath}:${line}:${column}`);
  }

  console.error(source.slice(lineStart, lineEnd));
  console.error(`${' '.repeat(error.start - lineStart)}^`);
  console.error();
  console.error(`${red}${error.name}: ${error.message}${clear}`);

  for (const { fileName, functionName, index } of error.stack) {
    const position = indexToPosition(source, index);

    if (!position) {
      continue;
    }

    const { lineNumber, columnNumber } = position;
    const location = `${fileName}:${lineNumber}:${columnNumber}`;

    console.error(
      `${black}    at ${
        functionName ? `${functionName} (${location})` : location
      }${clear}`,
    );
  }

  console.error();
};
