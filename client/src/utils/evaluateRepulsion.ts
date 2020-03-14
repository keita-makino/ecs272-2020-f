import { Node, Area, Edge } from '../types/Shapes';
import { createPoint, createNode } from '../constructors/shapeConstructors';
export const evaluateRepulsion = async (
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
