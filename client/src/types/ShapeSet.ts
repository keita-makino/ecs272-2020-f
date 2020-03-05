import { Circle, Line, Area, Point } from './Shapes';
import { Location } from '../types/Location';

export type ShapeConstructor = <T extends ShapeSetBase>(
  nodes: Location[],
  check: (val: T) => boolean
) => T;

export type ShapeSetBase = {
  nodes: Circle[];
  edges?: Line[];
  area?: Area;
};

export type ShapeSetActive = ShapeSetBase & {
  getBoundary: () => Point[];
  getCenter: () => Point;
};
