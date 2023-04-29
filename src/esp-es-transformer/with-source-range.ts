import { ES } from '../es-ast';

export const withSourceRange = <T extends ES.Node>(
  sourceNode: { start: number; end: number },
  targetNode: T,
): T => {
  return { sourceRange: [sourceNode.start, sourceNode.end], ...targetNode };
};
