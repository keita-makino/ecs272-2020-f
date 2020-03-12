import { ShapeSet } from '../types/ShapeSet';
import { polygonContains } from 'd3-polygon';
import { Point, Path } from '../types/Shapes';

const isAllContained = async (activeSet: ShapeSet, path: Path) => {
  return activeSet.nodes.reduce((prev, curr) => {
    return (
      prev &&
      polygonContains(path.getCoordinates(), [curr.center.lng, curr.center.lat])
    );
  }, true);
};

export default isAllContained;
