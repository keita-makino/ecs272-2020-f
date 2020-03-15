import { ShapeSetBase, ShapeSet } from '../types/ShapeSet';
import { Area } from '../types/Shapes';
import { evaluateRepulsion } from './evaluateRepulsion';

export const fillPotentialGrid = async (
  potentialGrid: Area,
  activeSet: ShapeSet,
  inactiveSet: ShapeSetBase,
  parameter: [number, number],
  factor: [number, number, number]
) => {
  if (!activeSet.edges) {
    return;
  }
  const rDiff = parameter[1] - parameter[0];
  const inverse = Math.pow(rDiff, 2);

  activeSet.edges.map(async item => {
    const target = item.getCorrespondingBuffer(potentialGrid, rDiff);
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      target,
      factor[1] / inverse,
      parameter[1],
      item
    );
  });
  potentialGrid.buffer.map(item => item - Number.EPSILON);
  activeSet.nodes.map(async item => {
    const target = item.getCorrespondingBuffer(potentialGrid, rDiff);
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      target,
      factor[0] / inverse,
      parameter[1],
      item
    );
  });
  inactiveSet.nodes.map(async item => {
    const target = item.getCorrespondingBuffer(potentialGrid, rDiff);
    potentialGrid = await evaluateRepulsion(
      potentialGrid,
      target,
      factor[2] / inverse,
      parameter[1],
      item
    );
  });
  return potentialGrid;
};
