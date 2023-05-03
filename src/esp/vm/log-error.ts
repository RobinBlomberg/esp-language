import console from 'console';
import { black, clear, red } from '../../utils/ansi-escape-codes';
import { stylize } from '../lexer';
import { Error } from './errors';
import { indexToPosition } from './index-position-converter';

type LineLocation = {
  lineNumber: number;
  start: number;
  end: number;
};

export const logError = (
  error: Error,
  source: string,
  sourceFileName?: string,
) => {
  const lineLocations: LineLocation[] = [];
  let isLastLine = false;
  let lineNumber = 1;
  let lineStart = 0;

  for (let i = 0; i <= source.length; i++) {
    isLastLine = i === source.length;

    const isEndOfLine =
      isLastLine ||
      source[i] === '\n' ||
      (source[i] === '\r' && source[i + 1] !== '\n');

    if (isEndOfLine) {
      lineLocations.push({ lineNumber, start: lineStart, end: i });

      if (i > error.start) {
        break;
      }

      lineNumber++;
      lineStart = i + 1;
    }
  }

  if (sourceFileName) {
    console.error(`${black}${sourceFileName}${clear}`);
  }

  const maxLineNumberWidth = String(lineNumber).length;

  for (const line of lineLocations.slice(-3)) {
    const lineNumberWidth = String(line.lineNumber).length;
    const padding = ' '.repeat(maxLineNumberWidth - lineNumberWidth);
    const margin = `${padding}${black}${line.lineNumber} │${clear} `;

    const sourceLine = source.slice(line.start, line.end);
    const content = stylize(sourceLine);
    const stylizedSourceLine = `${margin}${content}`;

    console.error(stylizedSourceLine);
  }

  const margin = isLastLine ? '   ' : `${black}${lineNumber + 1} │${clear}`;
  const lineErrorIndex = error.start - lineStart;

  console.error(`${margin} ${' '.repeat(lineErrorIndex)}^`);
  console.error();
  console.error(`${red}${error.name}: ${error.message}${clear}`);

  for (const { fileName, functionName, index } of error.stack) {
    const pos = indexToPosition(source, index);

    if (!pos) {
      continue;
    }

    const location = `${fileName}:${pos.lineNumber}:${pos.columnNumber}`;

    console.error(
      `${black}    at ${
        functionName ? `${functionName} (${location})` : location
      }${clear}`,
    );
    console.error();
  }
};
