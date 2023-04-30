import { ES } from '../es-ast';

export const injectSourceRange = <T extends ES.Node>(
  sourceNode: { start: number; end: number },
  targetNode: T,
): T => {
  return { sourceRange: [sourceNode.start, sourceNode.end], ...targetNode };
};
