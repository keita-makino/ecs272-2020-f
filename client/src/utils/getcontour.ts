import { ShapeSetBase, ShapeSetActive, ShapeSet } from '../types/ShapeSet';
import { Path } from '../types/Shapes';
import connectNodes from './connectNodes';
import createAreaDomain from '../constructors/areaDomainConstructor';
import { createArea } from '../constructors/shapeConstructors';
import getPaths from './getPaths';
import isAllContained from './isAllContained';
import { fillPotentialGrid } from './fillPotentialGrid';

export type Domain = {};

const getContour = async (activeSet: ShapeSet, inactiveSet: ShapeSetBase) => {
  const domain = await createAreaDomain(activeSet);
  const potentialGrid = createArea(domain);

  const r0 = 0.0005;
  const r1 = 0.00075;
  let iteration = 0;
  let threshold = 1;
  const factorNode = 1;
  const factorNodeNegative = -0.8;
  const factorEdge = 1;

  let path: Path | undefined;
  do {
    activeSet.area = await fillPotentialGrid(
      potentialGrid,
      activeSet,
      inactiveSet,
      [r0, r1],
      [factorNode, factorEdge, factorNodeNegative]
    );
    path = await getPaths(activeSet, threshold);
    if (!path) continue;

    threshold *= 0.9;
    iteration += 1;
  } while (!(await isAllContained(activeSet, path!)) && iteration < 20);

  return path;
};

export default getContour;
