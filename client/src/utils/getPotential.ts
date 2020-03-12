import { ShapeSetBase, ShapeSetActive, ShapeSet } from '../types/ShapeSet';
import { Node, Area, Edge } from '../types/Shapes';
import connectNodes from './connectNodes';
import createAreaDomain from '../constructors/areaDomainConstructor';
import {
  createArea,
  createPoint,
  createNode
} from '../constructors/shapeConstructors';

export type Domain = {};

const getPotential = async (activeSet: ShapeSet, inactiveSet: ShapeSetBase) => {
  const domain = await createAreaDomain(activeSet);
  const potentialGrid = createArea(domain);

  fillPotentialGrid(potentialGrid, activeSet, inactiveSet);

  return;
};

const fillPotentialGrid = async (
  potentialGrid: Area,
  activeSet: ShapeSet,
  inactiveSet: ShapeSetBase
) => {
  if (!activeSet.edges) {
    return;
  }

  const factorNode = 1;
  const factorEdge = 1;
  const factorNodeNegative = -0.8;

  const r0 = 0.0015;
  const r1 = 0.01;

  activeSet.nodes.map(async item => {
    const rDiff = r0 - r1;
    const inverse = Math.pow(rDiff, 2);
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factorNode / inverse,
      r1,
      item
    );
  });

  inactiveSet.nodes.map(async item => {
    const rDiff = r0 - r1;
    const inverse = Math.pow(rDiff, 2);
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factorNodeNegative / inverse,
      r1,
      item
    );
  });

  activeSet.edges.map(async item => {
    const rDiff = r0 - r1;
    const inverse = Math.pow(rDiff, 2);
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      factorEdge / inverse,
      r1,
      item
    );
  });

  console.log(potentialGrid);
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
