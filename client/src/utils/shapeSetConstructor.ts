import {
  ShapeSetBase,
  ShapeConstructor,
  ShapeSetActive
} from '../types/ShapeSet';
import { Location } from '../types/Location';
import { createCircle, createPoint } from './shapeConstructors';

const createShapeSet: ShapeConstructor = <T extends ShapeSetBase>(
  nodes: Location[],
  check: (val: T) => boolean
): T => {
  let x: T;
  const activeFunctions = check
    ? {
        getBoundary: () => [createPoint(5, 5)],
        getCenter: () =>
          createPoint(
            nodes.reduce((prev, curr) => prev + curr.lat, 0) / nodes.length,
            nodes.reduce((prev, curr) => prev + curr.lng, 0) / nodes.length
          )
      }
    : undefined;
  return {
    nodes: nodes.map(item => {
      const point = createPoint(item.lat, item.lng);
      return createCircle(point, 0.1);
    }),
    ...activeFunctions
  } as T;
};
export { createShapeSet };
