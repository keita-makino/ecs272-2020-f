import { ShapeSetBase, ShapeSet } from '../types/ShapeSet';
import { Path } from '../types/Shapes';
import createAreaDomain from '../constructors/areaDomainConstructor';
import {
  createArea,
  createPoint,
  createPath
} from '../constructors/shapeConstructors';
import getPaths from './getPaths';
import isAllContained from './isAllContained';
import { fillPotentialGrid } from './fillPotentialGrid';

export type Domain = {};

const getContour = async (
  activeSet: ShapeSet,
  inactiveSet: ShapeSetBase,
  cellSize: number
): Promise<Path[]> => {
  const domain = await createAreaDomain(activeSet, cellSize);
  const potentialGrid = createArea(domain);

  const r0 = cellSize * 2;
  const r1 = cellSize * 4;
  let iteration = 0;
  let threshold = 1;
  const factorNode = 1;
  const factorNodeNegative = -0.4;
  const factorEdge = 1;

  let path: number[][][] | undefined;
  do {
    activeSet.area = await fillPotentialGrid(
      potentialGrid,
      activeSet,
      inactiveSet,
      [r0, r1],
      [factorNode, factorEdge, factorNodeNegative]
    );
    [path] = await getPaths(activeSet, threshold);
    if (!path) continue;

    threshold *= 0.9;
    iteration += 1;
  } while (!(await isAllContained(activeSet, path!)) && iteration < 1);

  return path.map(item => {
    return createPath(
      item.map(item2 => {
        const point = activeSet.area!.getPosition(item2[0], item2[1]);
        return createPoint(point.lng, point.lat);
      })
    );
  });
};

export default getContour;
