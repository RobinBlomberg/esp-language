export class Range<T> {
  start: T;
  end: T;
  inclusive: boolean;

  constructor(start: T, end: T, inclusive = false) {
    this.start = start;
    this.end = end;
    this.inclusive = inclusive;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    if (typeof this.start !== typeof this.end) {
      return;
    }

    if (typeof this.start === 'string') {
      if (this.start.length !== 1 || (this.end as string).length !== 1) {
        return;
      }

      const start = this.start.charCodeAt(0);
      const end = (this.end as string).charCodeAt(0);

      if (this.inclusive) {
        for (let i = start; i <= end; i++) yield String.fromCharCode(i) as T;
      } else {
        for (let i = start; i < end; i++) yield String.fromCharCode(i) as T;
      }
    } else if (typeof this.start === 'number') {
      if (this.inclusive) {
        for (let i = this.start; i <= (this.end as number); i++) yield i;
      } else {
        for (let i = this.start; i < (this.end as number); i++) yield i;
      }
    }
  }

  contains(value: T) {
    return (
      value >= this.start &&
      (this.inclusive ? value <= this.end : value < this.end)
    );
  }
}
