import { compile } from '../compile';
import { createRegExp } from '../create-regexp';
import { RegExpPattern } from './pattern';

export class BasePattern {
  compile(this: RegExpPattern) {
    return compile(this);
  }

  toRegExp(this: RegExpPattern) {
    return createRegExp(this);
  }
}
