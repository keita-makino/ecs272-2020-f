import { ShapeSetBase, ShapeSetActive, ShapeSet } from '../types/ShapeSet';
import { Node, Area, Edge, Path } from '../types/Shapes';
import connectNodes from './connectNodes';
import createAreaDomain from '../constructors/areaDomainConstructor';
import {
  createArea,
  createPoint,
  createNode
} from '../constructors/shapeConstructors';
import getPaths from './getPaths';
import isAllContained from './isAllContained';

export type Domain = {};

const getPotential = async (activeSet: ShapeSet, inactiveSet: ShapeSetBase) => {
  const domain = await createAreaDomain(activeSet);
  const potentialGrid = createArea(domain);

  const r0 = 0.001;
  const r1 = 0.005;
  let iteration = 0;
  let threshold = 1;

  let path: Path | undefined;
  do {
    activeSet.area = await fillPotentialGrid(
      potentialGrid,
      activeSet,
      inactiveSet,
      [r0, r1]
    );
    path = await getPaths(activeSet, threshold);
    if (!path) continue;

    console.log(!(await isAllContained(activeSet, path!)));
    threshold *= 0.9;
    iteration += 1;
  } while (!(await isAllContained(activeSet, path!)) && iteration < 20);

  return path;
};

const fillPotentialGrid = async (
  potentialGrid: Area,
  activeSet: ShapeSet,
  inactiveSet: ShapeSetBase,
  parameter: [number, number]
) => {
  if (!activeSet.edges) {
    return;
  }

  const factorNode = 1;
  const factorEdge = 1;
  const factorNodeNegative = -0.8;
  const rDiff = parameter[0] - parameter[1];
  const inverse = Math.pow(rDiff, 2);

  activeSet.nodes.map(async item => {
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factorNode / inverse,
      parameter[1],
      item
    );
  });

  inactiveSet.nodes.map(async item => {
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factorNodeNegative / inverse,
      parameter[1],
      item
    );
  });

  activeSet.edges.map(async item => {
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factorEdge / inverse,
      parameter[1],
      item
    );
  });

  return potentialGrid;
};

const evaluateRepulsion = async (
  potentialGrid: Area,
  factor: number,
  r: number,
  element: Node | Edge
): Promise<Area> => {
  const domain = potentialGrid.domain;
  potentialGrid.buffer = potentialGrid.buffer.map((cell, index) => {
    const [x, y] = [
      index % domain.numOfCells[0],
      Math.floor(index / domain.numOfCells[0])
    ];
    const position = potentialGrid.getPosition(x, y);

    let distance;
    if ('getDistanceToEdge' in element) {
      distance = position.getDistance(element.center);
    } else {
      distance = createNode(
        createPoint(position.lng, position.lat),
        0.001
      ).getDistanceToEdge(element as Edge);
    }

    if (distance < r) {
      const dr = distance - r;
      return cell + factor * Math.pow(dr, 2);
    } else {
      return cell;
    }
  });
  return potentialGrid;
};

export default getPotential;
