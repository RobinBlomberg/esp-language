import { positionToIndex } from './index-position-converter';

export const getSourceLocation = (
  output: string,
  lineNumber: number,
  columnNumber: number,
  sourceMap: [number, number, number][],
) => {
  const index = positionToIndex(output, lineNumber, columnNumber);
  if (index === null) {
    return null;
  }

  const sourceMapping = sourceMap.find(([sourceIndex]) => sourceIndex >= index);
  if (!sourceMapping) {
    return null;
  }

  return {
    start: sourceMapping[1],
    end: sourceMapping[2],
  };
};
