import { Node, Edge } from '../types/Shapes';
export const getCenterNodeAlongEdge = async (nodes: Node[], edge: Edge) =>
  (
    await nodes.reduce(
      async (
        _prev: Promise<{
          minDistanceRatio: number;
          closestNeighboringNode?: Node;
        }>,
        curr: Node
      ) => {
        const prev = await _prev;
        const distanceRatio =
          (2 * curr.center.getDistance(edge.center)) / edge.length;
        return distanceRatio < prev.minDistanceRatio
          ? { minDistanceRatio: distanceRatio, closestNeighboringNode: curr }
          : prev;
      },
      Promise.resolve({
        minDistanceRatio: 1,
        closestNeighboringNode: undefined
      })
    )
  ).closestNeighboringNode;
