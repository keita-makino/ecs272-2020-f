import {
  LineConstructor,
  CircleConstructor,
  Line,
  Point,
  AreaConstructor,
  Circle,
  Area,
  PointConstructor
} from '../types/Shapes';

const createLine: LineConstructor = (s: Point, e: Point): Line => ({
  start: s,
  end: e,
  getAbc: () => ({
    a: s.latitude - e.latitude,
    b: e.longitude - s.longitude,
    c: s.longitude * e.latitude - e.longitude * s.latitude
  })
});

const createCircle: CircleConstructor = (c: Point, r: number): Circle => ({
  center: c,
  radius: r,
  isIntersectLine: (line: Line) => {
    const coefs = line.getAbc();
    const distance =
      Math.abs(coefs.a * c.longitude + coefs.b * c.latitude + coefs.c) /
      Math.sqrt(coefs.a * coefs.a + coefs.b + coefs.b);

    return distance < r;
  }
});

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
    Math.sqrt(Math.pow(p.longitude - x, 2) + Math.pow(p.longitude - x, 2))
});
