export type Abrupt = Error | Unused;

export type Error = {
  type: 'Error';
  start: number;
};

export const Error = (start: number): Error => ({
  type: 'Error',
  start,
});

export type Unused = {
  type: 'Unused';
  start: number;
};

export const Unused = (start: number): Unused => ({
  type: 'Unused',
  start,
});

export const error = ({ start }: { start: number }): Error => ({
  type: 'Error',
  start,
});

export const unused = ({ start }: { start: number }): Unused => ({
  type: 'Unused',
  start,
});
