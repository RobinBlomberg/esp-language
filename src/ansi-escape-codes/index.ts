const code = (c: number) => {
  return `\x1b[${c}m`;
};

export const clear = code(0);
export const bold = code(1);

export const black = code(30);
export const red = code(31);
export const green = code(32);
export const yellow = code(33);
export const blue = code(34);
export const magenta = code(35);
export const cyan = code(36);
export const white = code(37);

export const fg = {
  clear: code(39),
};

export const bg = {
  black: code(40),
  red: code(41),
  green: code(42),
  yellow: code(43),
  blue: code(44),
  magenta: code(45),
  cyan: code(46),
  white: code(47),
  clear: code(49),
  bright: {
    black: code(100),
    red: code(101),
    green: code(102),
    yellow: code(103),
    blue: code(104),
    magenta: code(105),
    cyan: code(106),
    white: code(107),
  },
};

export const bright = {
  black: code(90),
  red: code(91),
  green: code(92),
  yellow: code(93),
  blue: code(94),
  magenta: code(95),
  cyan: code(96),
  white: code(97),
};
