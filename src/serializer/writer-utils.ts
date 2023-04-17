const UnicodeIDStart = /[\p{ID_Start}]/u;

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
 * @see https://tc39.es/ecma262/#prod-IdentifierStartChar
 */
export const isIdentifierStart = (char: string) => {
  return (
    UnicodeIDStart.test(char) || char === '$' || char === '_' || char === '\\'
  );
};

/**
 * ```ecmarkup
 * ReservedWord :: one of
 *   await break case catch class const continue debugger default delete do else enum export extends
 *   false finally for function if import in instanceof new null return super switch this throw true
 *   try typeof var void while with yield
 * ```
 
 * @see https://tc39.es/ecma262/#prod-ReservedWord
 */
export const isReservedWordPartChar = (char: string) => {
  return char >= 'a' && char <= 'z';
};
