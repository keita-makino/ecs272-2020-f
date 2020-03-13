import { Node, Edge, Area, Point, Path } from './Shapes';

export type ShapeSet = ShapeSetBase | ShapeSetActive;

export type ShapeConstructor = (
  nodes: Node[],
  type: 'base' | 'active'
) => ShapeSet;

export type ShapeSetBase = {
  nodes: Node[];
  edges?: Edge[];
  area?: Area;
};

export type ShapeSetActive = ShapeSetBase & {
  getBoundary: () => Path;
  getCenter: () => Point;
};
