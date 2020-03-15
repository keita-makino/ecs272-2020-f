import { Node, Area, Edge } from '../types/Shapes';
import { createPoint, createNode } from '../constructors/shapeConstructors';
export const evaluateRepulsion = async (
  potentialGrid: Area,
  target: number[],
  factor: number,
  r: number,
  element: Node | Edge
): Promise<Area> => {
  const domain = potentialGrid.domain;
  target.map(async item => {
    const curr = potentialGrid.buffer[item];
    const [x, y] = [
      item % domain.numOfCells[0],
      Math.floor(item / domain.numOfCells[0])
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
      potentialGrid.buffer[item] = curr + factor * Math.pow(dr, 2);
    } else {
      potentialGrid.buffer[item] = curr;
    }
  });
  return potentialGrid;
};
