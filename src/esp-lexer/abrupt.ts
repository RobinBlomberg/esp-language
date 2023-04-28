export type Abrupt = Error | Unused;

export type Error = {
  type: 'Error';
  start: number;
  end: number;
};

export const Error = (start: number, end: number): Error => ({
  type: 'Error',
  start,
  end,
});

export type Unused = {
  type: 'Unused';
  start: number;
  end: number;
};

export const Unused = (index: number): Unused => ({
  type: 'Unused',
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
  type: 'Error',
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
  type: 'Unused',
  start,
  end,
});
