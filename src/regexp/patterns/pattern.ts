import { Backreference } from './backreference';
import { BoundaryAssertion } from './boundary-assertion';
import { CapturingGroup } from './capturing-group';
import { CharacterSequence } from './character-sequence';
import { Concatenation } from './concatenation';
import { Disjunction } from './disjunction';
import { LookaroundAssertion } from './lookaround-assertion';
import { Quantifier } from './quantifier';

export type RegExpPattern =
  | Backreference
  | BoundaryAssertion
  | CapturingGroup
  | CharacterSequence
  | Concatenation
  | Disjunction
  | LookaroundAssertion
  | Quantifier;
