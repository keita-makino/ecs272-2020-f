import { Node, Edge } from '../types/Shapes';
export const countInterferenceNodes = async (
  inactiveSetNodes: Node[],
  edge: Edge
) => {
  return inactiveSetNodes.reduce(
    (prev, curr) =>
      curr.getDistanceToEdge(edge) < curr.radius ? prev + 1 : prev,
    0
  );
};
