import { ShapeSet } from '../types/ShapeSet';
import { polygonContains } from 'd3-polygon';
import { Point, Path } from '../types/Shapes';

const isAllContained = async (activeSet: ShapeSet, path: number[][][]) => {
  return activeSet.nodes.reduce((prev, curr) => {
    return path.reduce(
      (prev2, curr2) =>
        prev2 &&
        polygonContains(curr2 as [number, number][], [
          curr.center.lng,
          curr.center.lat
        ]),
      true
    );
  }, true);
};

export default isAllContained;
