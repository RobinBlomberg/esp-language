import { writeFile } from 'node:fs/promises';
import { clear, green } from '../../utils/ansi/escape-codes';
import { patterns, repository } from './repository';
import { TextMate } from './textmate';

export const generate = async (path: string) => {
  const language: TextMate.Language = {
    name: 'ESP',
    scopeName: 'source.esp',
    patterns,
    repository,
  };
  const data = JSON.stringify(language, null, 2);

  await writeFile(path, data, 'utf8');

  console.info(`${green}ESP TextMate grammar successfully generated.${clear}`);
};
