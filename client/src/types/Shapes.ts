export type LineConstructor = (s: Point, e: Point) => Line;

export type Line = {
  start: Point;
  end: Point;
  getAbc: () => { a: number; b: number; c: number };
};

export type PathConstructor = (a: Line[]) => Path;

export type Path = Line[];

export type CircleConstructor = (c: Point, r: number) => Circle;

export type Circle = {
  center: Point;
  radius: number;
  isIntersectLine: (l: Line) => boolean;
};

export type PointConstructor = (x: number, y: number) => Point;

export type Point = Coordinates & {
  getDistance: (p: Point) => number;
};

export type AreaConstructor = (w: number, h: number) => Area;

export type Area = {
  buffer: Float32Array;
  getBuffer: (x: number, y: number) => number;
  setBuffer: (x: number, y: number, v: number) => void;
};
