import { AreaDomainConstructor, AreaDomain } from '../types/Shapes';

import { ShapeSet } from '../types/ShapeSet';

const createAreaDomain: AreaDomainConstructor = async (
  s: ShapeSet,
  c: number
): Promise<AreaDomain> => {
  const range = await getRange(s);
  const cellSize = c;
  return {
    cellSize: cellSize,
    numOfCells: [
      Math.ceil((range.xMax - range.xMin) / cellSize),
      Math.ceil((range.yMax - range.yMin) / cellSize)
    ],
    boundary: range
  };
};

const getRange = async (set: ShapeSet) => {
  const range = !set.edges
    ? {
        xMin: Math.min(...set.nodes.map(item => item.center.lng)),
        xMax: Math.max(...set.nodes.map(item => item.center.lng)),
        yMin: Math.min(...set.nodes.map(item => item.center.lat)),
        yMax: Math.max(...set.nodes.map(item => item.center.lat))
      }
    : {
        xMin: Math.min(
          ...set.nodes.map(item => item.center.lng),
          ...set.edges!.map(item => item.start.lng),
          ...set.edges!.map(item => item.end.lng)
        ),
        xMax: Math.max(
          ...set.nodes.map(item => item.center.lng),
          ...set.edges!.map(item => item.start.lng),
          ...set.edges!.map(item => item.end.lng)
        ),
        yMin: Math.min(
          ...set.nodes.map(item => item.center.lat),
          ...set.edges!.map(item => item.start.lat),
          ...set.edges!.map(item => item.end.lat)
        ),
        yMax: Math.max(
          ...set.nodes.map(item => item.center.lat),
          ...set.edges!.map(item => item.start.lat),
          ...set.edges!.map(item => item.end.lat)
        )
      };
  const buffer = set.nodes.length > 0 ? set.nodes[0].radius : 0.025;
  range.xMax += buffer * 3;
  range.xMin -= buffer * 3;
  range.yMax += buffer * 3;
  range.yMin -= buffer * 3;
  return range;
};

export default createAreaDomain;
