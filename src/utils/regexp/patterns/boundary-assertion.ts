import { PatternType } from '../pattern-type';
import { BasePattern } from './base-pattern';

export type BoundaryKind = 'End' | 'NonWord' | 'Start' | 'Word';

export class BoundaryAssertion extends BasePattern {
  readonly type = PatternType.BoundaryAssertion;

  constructor(readonly kind: BoundaryKind) {
    super();
  }
}
