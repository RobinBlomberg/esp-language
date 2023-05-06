import { PatternType } from '../pattern-type';
import { Quantifiable } from './quantifiable';

export class Backreference extends Quantifiable {
  readonly type = PatternType.Backreference;

  constructor(readonly id: number | string) {
    super();
  }
}
