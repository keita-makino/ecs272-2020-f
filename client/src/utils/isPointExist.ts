import { Edge, Point } from '../types/Shapes';
import { createNode } from '../constructors/shapeConstructors';
export const isPointExist = async (point: Point, edges: Edge[]) =>
  await edges.reduce((prev: Promise<boolean>, curr: Edge) => {
    const node = createNode(point);
    return (
      prev ||
      point.getDistance(curr.start) < node.radius ||
      point.getDistance(curr.end) < node.radius
    );
  }, Promise.resolve(false));
