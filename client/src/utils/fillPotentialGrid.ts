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
