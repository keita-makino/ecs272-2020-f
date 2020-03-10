import { ShapeSetBase, ShapeSetActive, ShapeSet } from '../types/ShapeSet';
import { Node } from '../types/Shapes';
import connectNodes from './connectNodes';

const getVirtualEdges = async (
  activeSet: ShapeSet,
  inactiveSet: ShapeSetBase
) => {
  if (!activeSet.nodes) return [];
  if (!('getCenter' in activeSet)) return [];
  activeSet.nodes.sort((a: Node, b: Node) =>
    a.getDistanceToCenter!() < b.getDistanceToCenter!() ? -1 : 1
  );

  const scannedEdges = await connectNodes(activeSet.nodes, inactiveSet.nodes);
  console.log(scannedEdges);
  return scannedEdges;
};

export default getVirtualEdges;
