import { Circle, Line, Area, Point } from './Shapes';

export type ShapeSet = {
  nodes: Circle;
  edges: Line;
  areas: Area;
  getBoundary: () => Point[];
}[];
