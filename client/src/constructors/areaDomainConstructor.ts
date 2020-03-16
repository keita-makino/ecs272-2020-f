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
  range.xMax += 0.025;
  range.xMin -= 0.025;
  range.yMax += 0.025;
  range.yMin -= 0.025;
  return range;
};

export default createAreaDomain;
