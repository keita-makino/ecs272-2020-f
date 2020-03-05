import { Location } from '../types/Location';
import { ShapeSetBase, ShapeSetActive } from '../types/ShapeSet';

const getVirtualEdges = async (
  activeLocations: ShapeSetActive,
  inactiveLocations: ShapeSetBase
) => {
  if (!activeLocations) return;
  activeLocations.nodes.sort((a: any, b: any) =>
    a.center.getDistance(activeLocations.getCenter())
  );
  return;
};

export default getVirtualEdges;
