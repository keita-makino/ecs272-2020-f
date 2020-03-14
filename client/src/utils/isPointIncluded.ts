import { Node, Point } from '../types/Shapes';
export const isPointIncluded = async (point: Point, nodes: Node[]) =>
  await nodes.reduce(
    (prev: Promise<boolean>, curr: Node) =>
      prev ||
      point.getDistance(curr.center) < curr.radius ||
      point.getDistance(curr.center) < curr.radius,
    Promise.resolve(false)
  );
