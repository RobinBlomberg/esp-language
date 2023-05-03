import { writeFile } from 'node:fs/promises';
import { clear, green } from '../../utils/ansi-escape-codes';
import { language } from './grammar';

const TMLANGUAGE_SCHEMA_URL =
  'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json';

export const generate = async (tmLanguagePath: string) => {
  const tmLanguageJson = JSON.stringify(
    {
      $schema: TMLANGUAGE_SCHEMA_URL,
      ...language,
    },
    null,
    2,
  );

  await writeFile(tmLanguagePath, tmLanguageJson, 'utf8');

  console.info(
    `${green}Syntax highlighting generated at "${tmLanguagePath}"${clear}`,
  );
};
