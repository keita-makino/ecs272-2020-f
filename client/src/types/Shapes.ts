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
};

export type PathConstructor = (a: Edge[]) => Path;

export type Path = Edge[];

export type NodeConstructor = (c: Point, r: number) => Node;

export type Node = Partial<ParentSet> & {
  center: Point;
  radius: number;
  getDistanceToEdge: (l: Edge) => number;
};

export type PointConstructor = (x: number, y: number) => Point;

export type Point = {
  lng: number;
  lat: number;
  getDistance: (p: Point) => number;
  scale: (n: number) => Point;
  add: (p: Point) => Point;
  sub: (p: Point) => Point;
};

export type AreaConstructor = (d: AreaDomain) => Area;

export type Area = Partial<ParentSet> & {
  buffer: Float32Array;
  domain: AreaDomain;
  getBuffer: (x: number, y: number) => number;
  setBuffer: (x: number, y: number, v: number) => void;
  getPosition: (x: number, y: number) => Point;
};

export type AreaDomainConstructor = (s: ShapeSet) => Promise<AreaDomain>;

export type AreaDomain = {
  cellSize: number;
  numOfCells: [number, number];
  boundary: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };
};
