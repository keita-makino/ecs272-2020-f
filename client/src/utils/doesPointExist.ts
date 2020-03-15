import { Edge, Point } from '../types/Shapes';
import { createNode } from '../constructors/shapeConstructors';

export const doesPointExist = async (point: Point, edges: Edge[]) => {
  const node = createNode(point);
  return edges.reduce((prev: Promise<boolean>, curr: Edge) => {
    return (
      prev ||
      point.getDistance(curr.start) < node.radius ||
      point.getDistance(curr.end) < node.radius
    );
  }, Promise.resolve(false));
};
