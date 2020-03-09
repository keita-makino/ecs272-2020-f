import { ShapeSet } from './ShapeSet';

export type ShapeElementConstructor = (p: ShapeSet) => ParentSet;

export type ParentSet = {
  parent: ShapeSet;
  getDistanceToCenter: () => number;
};

export type EdgeConstructor = (s: Point, e: Point) => Edge;

export type Edge = Partial<ParentSet> & {
  start: Point;
  end: Point;
  center: Point;
  length: number;
  getAbc: () => { a: number; b: number; c: number };
};

export type PathConstructor = (a: Edge[]) => Path;

export type Path = Edge[];

export type NodeConstructor = (c: Point, r: number) => Node;

export type Node = Partial<ParentSet> & {
  center: Point;
  radius: number;
  distanceToEdge: (l: Edge) => number;
};

export type PointConstructor = (x: number, y: number) => Point;

export type Point = Coordinates & {
  getDistance: (p: Point) => number;
  scale: (n: number) => Point;
  add: (p: Point) => Point;
  sub: (p: Point) => Point;
};

export type AreaConstructor = (w: number, h: number) => Area;

export type Area = Partial<ParentSet> & {
  buffer: Float32Array;
  getBuffer: (x: number, y: number) => number;
  setBuffer: (x: number, y: number, v: number) => void;
};
