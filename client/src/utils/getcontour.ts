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

const fillPotentialGrid = async (
  potentialGrid: Area,
  activeSet: ShapeSet,
  inactiveSet: ShapeSetBase,
  parameter: [number, number],
  factor: [number, number, number]
) => {
  if (!activeSet.edges) {
    return;
  }

  const rDiff = parameter[0] - parameter[1];
  const inverse = Math.pow(rDiff, 2);

  activeSet.nodes.map(async item => {
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factor[0] / inverse,
      parameter[1],
      item,
      true
    );
  });

  activeSet.edges.map(async item => {
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factor[1] / inverse,
      parameter[1],
      item,
      true
    );
  });
  inactiveSet.nodes.map(async item => {
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factor[2] / inverse,
      parameter[1],
      item,
      false
    );
  });

  return potentialGrid;
};

const evaluateRepulsion = async (
  potentialGrid: Area,
  factor: number,
  r: number,
  element: Node | Edge,
  computeAll: boolean
): Promise<Area> => {
  const domain = potentialGrid.domain;
  potentialGrid.buffer = potentialGrid.buffer.map((cell, index) => {
    if (cell < 0) return cell;
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

export default getContour;
