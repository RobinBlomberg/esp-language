import { PatternType } from '../pattern-type';

export type BoundaryKind = 'End' | 'NonWord' | 'Start' | 'Word';

export class BoundaryAssertion {
  readonly type = PatternType.BoundaryAssertion;

  constructor(readonly kind: BoundaryKind) {}
}
