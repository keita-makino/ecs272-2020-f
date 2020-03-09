import {
  EdgeConstructor,
  NodeConstructor,
  Edge,
  Point,
  AreaConstructor,
  Node,
  Area,
  PointConstructor,
  PathConstructor,
  Path
} from '../types/Shapes';

const createEdge: EdgeConstructor = (s: Point, e: Point): Edge => ({
  start: s,
  end: e,
  center: s.add(e).scale(0.5),
  length: s.getDistance(e),
  getAbc: () => ({
    a: s.latitude - e.latitude,
    b: e.longitude - s.longitude,
    c: s.longitude * e.latitude - e.longitude * s.latitude
  })
});

const createPath: PathConstructor = (a: Edge[]): Path => a;

const createNode: NodeConstructor = (c: Point, r: number): Node => {
  return {
    center: c,
    radius: r,
    distanceToEdge: (e: Edge) => {
      const coefs = e.getAbc();
      const distance =
        Math.abs(coefs.a * c.longitude + coefs.b * c.latitude + coefs.c) /
        Math.sqrt(coefs.a * coefs.a + coefs.b * coefs.b);
      return distance;
    }
  };
};

const createArea: AreaConstructor = (w: number, h: number): Area => {
  const buffer = new Float32Array(w * h);
  return {
    buffer: buffer,
    getBuffer: (x: number, y: number) => buffer[x + y * w],
    setBuffer: (x: number, y: number, v: number) => {
      buffer[x + y * w] = v;
    }
  };
};

const createPoint: PointConstructor = (x: number, y: number): Point => ({
  accuracy: 1,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  longitude: x,
  latitude: y,
  speed: null,
  getDistance: (p: Point) =>
    Math.sqrt(Math.pow(p.longitude - x, 2) + Math.pow(p.longitude - x, 2)),
  scale: (n: number) => createPoint(x * n, y * n),
  add: (p: Point) => createPoint(x + p.longitude, y + p.latitude),
  sub: (p: Point) => createPoint(x - p.longitude, y - p.latitude)
});

export { createEdge, createPath, createPoint, createNode, createArea };
