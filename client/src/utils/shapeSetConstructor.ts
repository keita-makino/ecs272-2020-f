import { ShapeConstructor, ShapeSet } from '../types/ShapeSet';
import { Node } from '../types/Shapes';
import { createNode, createPoint } from './shapeConstructors';

const createShapeSet: ShapeConstructor = (
  nodes: Node[],
  type: 'base' | 'active'
) => {
  const activeFunctions =
    type === 'active'
      ? {
          getBoundary: () => [createPoint(5, 5)],
          getCenter: () =>
            createPoint(
              nodes.reduce((prev, curr) => prev + curr.center.latitude, 0) /
                nodes.length,
              nodes.reduce((prev, curr) => prev + curr.center.longitude, 0) /
                nodes.length
            )
        }
      : undefined;

  const shapeSet = {
    nodes: nodes.map(item => {
      const point = createPoint(item.center.longitude, item.center.latitude);
      const parentSet = {
        getDistanceToCenter: activeFunctions
          ? () => point.getDistance(activeFunctions.getCenter())
          : undefined
      };
      return {
        ...createNode(point, 0.001),
        ...parentSet
      };
    }),
    ...activeFunctions
  } as ShapeSet;

  shapeSet.nodes = shapeSet.nodes.map(item => ({ ...item, parent: shapeSet }));
  return shapeSet;
};

export { createShapeSet };
