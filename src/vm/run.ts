import { runInNewContext } from 'node:vm';
import { parseScript } from '../parser';
import { serialize } from '../serializer/write';
import { transformScript } from '../transformer/nodes/script';

export const run = (script: string) => {
  const espAst = parseScript(script, 0);

  if (!espAst) {
    throw new SyntaxError('Invalid syntax');
  }

  const esAst = transformScript(espAst);
  console.dir(esAst.body[1], { depth: null });
  const esScript = serialize(esAst);
  console.log(esScript);
  runInNewContext(esScript, { console });
};
