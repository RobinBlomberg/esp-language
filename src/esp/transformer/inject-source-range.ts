import { ES } from '../../es';

export const injectSourceRange = <T extends ES.AST.Node>(
  sourceNode: { start: number; end: number },
  targetNode: T,
): T => {
  return { sourceRange: [sourceNode.start, sourceNode.end], ...targetNode };
};
