import { Node, Edge } from '../types/Shapes';
export const rerouteEdgePoint = async (
  node: Node,
  buffer: number,
  edge: Edge,
  wrapNormal: 1 | -1
) => {
  const internalDivision =
    edge.start.getDistance(node.center) /
    (edge.start.getDistance(node.center) + edge.end.getDistance(node.center));
  const closestPointOnEdge = edge.start
    .scale(1 - internalDivision)
    .add(edge.end.scale(internalDivision));
  const newPoint = node.center.add(
    closestPointOnEdge
      .sub(node.center)
      .scale(
        (wrapNormal * buffer * node.radius) / 2 / node.getDistanceToEdge(edge)
      )
  );
  return newPoint;
};
