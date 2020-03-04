export type Line = {
  start: Point;
  end: Point;
};

export type Circle = {
  center: Point;
  radius: number;
  isIntersectLine: (l: Line) => boolean;
};

export type Point = {
  center: Coordinates;
  getDistance: (c: Point) => number;
};

export type Area = {
  width: number;
  height: number;
  buffer: Float32Array;
  getBuffer: (x: number, y: number) => number;
  setBuffer: (x: number, y: number, v: number) => void;
};
