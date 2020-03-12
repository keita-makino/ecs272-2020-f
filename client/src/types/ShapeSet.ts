import { Node, Edge, Area, Point } from './Shapes';
import { Record } from '../types/Location';

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
  getBoundary: () => Point[];
  getCenter: () => Point;
};
