import { contours } from 'd3-contour';
import { ShapeSet } from '../types/ShapeSet';

const getPaths = async (
  activeSet: ShapeSet,
  threshold: number
): Promise<number[][][][]> => {
  const result = contours()
    .size(activeSet.area!.domain.numOfCells)
    .smooth(true)
    .contour(Array.from(activeSet.area!.buffer) as number[], threshold);
  return (result.coordinates as unknown) as number[][][][];
};
export default getPaths;
