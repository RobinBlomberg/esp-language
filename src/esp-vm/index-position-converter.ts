export const indexToPosition = (source: string, index: number) => {
  let lineNumber = 1;
  let columnNumber = 1;

  for (let i = 0; i < source.length; i++) {
    if (i === index) {
      return { lineNumber, columnNumber };
    }

    if (source[i] === '\n' || (source[i] === '\r' && source[i + 1] !== '\n')) {
      lineNumber++;
      columnNumber = 1;
    } else {
      columnNumber++;
    }
  }

  return null;
};

export const positionToIndex = (data: string, line: number, column: number) => {
  if (Number.isNaN(line) || Number.isNaN(column)) {
    return null;
  }

  let ln = 1;
  let col = 1;
  let i = 0;

  while (i < data.length) {
    if (ln === line && col === column) {
      return i;
    }

    if (data[i] === '\n' || (data[i] === '\r' && data[i + 1] !== '\n')) {
      ln++;
      col = 1;
    } else {
      col++;
    }

    i++;
  }

  return null;
};
