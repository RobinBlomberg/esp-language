const UnicodeIDContinue = /[\p{ID_Continue}]/u;
const UnicodeIDStart = /[\p{ID_Start}]/u;
const ZWJ = '\u200D';
const ZWNJ = '\u200C';

/**
 * ```ecmarkup
 * IdentifierPartChar ::
 *   UnicodeIDContinue
 *   $
 *   <ZWNJ>
 *   <ZWJ>
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-IdentifierStartChar
 */
export const isIdentifierPartChar = (char: string) => {
  return (
    UnicodeIDContinue.test(char) ||
    char === '$' ||
    char === ZWNJ ||
    char === ZWJ
  );
};

/**
 * ```ecmarkup
 * IdentifierStart ::
 *   IdentifierStartChar
 *   \ UnicodeEscapeSequence
 *
 * IdentifierStartChar ::
 *   UnicodeIDStart
 *   $
 *   _
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-IdentifierStart
 */
export const isIdentifierStart = (char: string) => {
  return (
    UnicodeIDStart.test(char) || char === '$' || char === '_' || char === '\\'
  );
};
