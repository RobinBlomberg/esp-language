import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ESP } from '..';
import { clear, green } from '../../ansi/escape-codes';
import { VM } from '../module';

const logHelpAndExit = () => {
  console.info('Usage: esp [options] <file>');
  console.info();
  console.info('Options:');
  console.info('  --build-grammar  generate ESP TextMate grammar');
  console.info();
  process.exit(1);
};

export const run = async (args: string[]) => {
  switch (args[0]) {
    case '--build-grammar': {
      const pathInput = args[1];
      if (!pathInput) {
        logHelpAndExit();
        return;
      }

      const unresolvedPaths = pathInput.split(',');

      await Promise.all(
        unresolvedPaths.map(async (unresolvedPath) => {
          const path = resolve(process.cwd(), unresolvedPath);
          await ESP.TextMateGrammarGenerator.generate(path);
        }),
      );

      console.info(
        `${green}ESP TextMate grammar${
          unresolvedPaths.length === 1 ? '' : 's'
        } successfully generated.${clear}`,
      );

      break;
    }
    default: {
      const arg = args[0];
      if (!arg || arg.startsWith('--')) {
        logHelpAndExit();
        return;
      }

      const sourceFileName = resolve(process.cwd(), arg);
      const source = readFileSync(sourceFileName, 'utf8');
      VM.run(source, sourceFileName);
    }
  }
};
