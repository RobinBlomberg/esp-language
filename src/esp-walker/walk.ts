import { Node } from '../esp-parser';

const walkNode = (
  node: Node,
  depth: number,
  execute: (node: Node, depth: number) => void,
) => {
  execute(node, depth);

  for (const value of Object.values(node) as unknown[]) {
    if (Array.isArray(value)) {
      for (const element of value) {
        walkNode(element, depth + 1, execute);
      }
    } else if (typeof value === 'object' && value && 'type' in value) {
      walkNode(value as Node, depth + 1, execute);
    }
  }
};

/**
 * NOTE: This approach iterates through the node properties in insertion order,
 * giving semantic meaning to the AST property order.
 */
export const walk = (
  node: Node,
  execute: (node: Node, depth: number) => void,
) => {
  walkNode(node, 0, execute);
};
