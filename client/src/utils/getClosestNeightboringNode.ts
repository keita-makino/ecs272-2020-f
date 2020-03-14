import { ShapeSetActive } from '../types/ShapeSet';
import { Node } from '../types/Shapes';
import { createEdge } from '../constructors/shapeConstructors';
import { countInterferenceNodes } from './countInterferenceNodes';

export const getClosestNeightboringNode = async (
  node: Node,
  visited: ShapeSetActive,
  inactiveSetNodes: Node[]
) =>
  (
    await visited.nodes.reduce(
      async (
        prev: Promise<{
          minDistance: number;
          closestNeighboringNode: Node;
        }>,
        curr
      ) => {
        const edge = createEdge(node.center, curr.center);
        const numOfInterferenceNodes = await countInterferenceNodes(
          inactiveSetNodes,
          edge
        );
        const distance = edge.length;
        return Math.pow(distance, 2) * Math.pow(numOfInterferenceNodes + 1, 2) <
          (await prev).minDistance
          ? {
              minDistance:
                Math.pow(distance, 2) * Math.pow(numOfInterferenceNodes + 1, 2),
              closestNeighboringNode: curr
            }
          : prev;
      },
      Promise.resolve({
        minDistance: Number.POSITIVE_INFINITY,
        closestNeighboringNode: visited.nodes[0]
      })
    )
  ).closestNeighboringNode;
