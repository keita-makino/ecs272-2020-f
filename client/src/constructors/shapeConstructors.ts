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
  Path,
  AreaDomainConstructor,
  AreaDomain
} from '../types/Shapes';
import { ShapeSet } from '../types/ShapeSet';

const createEdge: EdgeConstructor = (s: Point, e: Point): Edge => ({
  start: s,
  end: e,
  center: s.add(e).scale(0.5),
  length: s.getDistance(e)
});

const createPath: PathConstructor = (a: Edge[]): Path => a;

const createNode: NodeConstructor = (c: Point, r: number): Node => {
  return {
    center: c,
    radius: r,
    getDistanceToEdge: (e: Edge) => {
      const xC = c.lng - e.start.lng;
      const yC = c.lat - e.start.lat;
      const xE = e.end.lng - e.start.lng;
      const yE = e.end.lat - e.start.lat;

      const dot = xC * xE + yC * yE;

      const param = e.length !== 0 ? dot / Math.pow(e.length, 2) : undefined;

      const point = param
        ? param < 0
          ? e.start
          : param > 1
          ? e.end
          : e.start.add(e.end.sub(e.start).scale(param))
        : undefined;

      return point ? c.getDistance(point) : c.getDistance(e.center);
    }
  };
};

const createArea: AreaConstructor = (d: AreaDomain): Area => {
  const s = d.numOfCells;
  const buffer = new Float32Array(s[0] * s[1]);
  return {
    buffer: buffer,
    domain: d,
    getBuffer: (x: number, y: number) => buffer[x + y * s[0]],
    setBuffer: (x: number, y: number, v: number) => {
      buffer[x + y * s[0]] = v;
    },
    getPosition: (x: number, y: number) =>
      createPoint(
        d.boundary.xMin + d.cellSize * x,
        d.boundary.yMin + d.cellSize * y
      )
  };
};

const createPoint: PointConstructor = (x: number, y: number): Point => ({
  lng: x,
  lat: y,
  getDistance: (p: Point) =>
    Math.sqrt(Math.pow(p.lng - x, 2) + Math.pow(p.lat - y, 2)),
  scale: (n: number) => createPoint(x * n, y * n),
  add: (p: Point) => createPoint(x + p.lng, y + p.lat),
  sub: (p: Point) => createPoint(x - p.lng, y - p.lat)
});

export { createEdge, createPath, createPoint, createNode, createArea };
