export type Abrupt = Error | Unused;

export type Error = {
  abrupt: 'Error';
  type?: never;
  start: number;
  end: number;
};

export const Error = (start: number, end: number): Error => ({
  abrupt: 'Error',
  start,
  end,
});

export type Unused = {
  abrupt: 'Unused';
  type?: never;
  start: number;
  end: number;
};

export const Unused = (index: number): Unused => ({
  abrupt: 'Unused',
  start: index,
  end: index,
});

export const error = ({
  start,
  end,
}: {
  start: number;
  end: number;
}): Error => ({
  abrupt: 'Error',
  start,
  end,
});

export const unused = ({
  start,
  end,
}: {
  start: number;
  end: number;
}): Unused => ({
  abrupt: 'Unused',
  start,
  end,
});
