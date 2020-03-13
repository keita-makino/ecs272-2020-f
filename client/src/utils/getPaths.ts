import { Point, Path } from '../types/Shapes';
import { contours } from 'd3-contour';
import { ShapeSet } from '../types/ShapeSet';
import { createPath } from '../constructors/shapeConstructors';

const getPaths = async (
  activeSet: ShapeSet,
  threshold: number
): Promise<Path> => {
  const result = contours()
    .size(activeSet.area!.domain.numOfCells)
    .contour(Array.from(activeSet.area!.buffer) as number[], threshold);
  return createPath(
    result.coordinates[0][0].map(item =>
      activeSet.area!.getPosition(item[0], item[1])
    )
  );
};
export default getPaths;
