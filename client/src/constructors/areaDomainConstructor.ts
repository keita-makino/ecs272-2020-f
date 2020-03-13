import { AreaDomainConstructor, AreaDomain } from '../types/Shapes';

import { ShapeSet } from '../types/ShapeSet';

const createAreaDomain: AreaDomainConstructor = async (
  s: ShapeSet
): Promise<AreaDomain> => {
  const range = await getRange(s);
  const cellSize = 0.00025;
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
  if (set.edges) {
    return {
      xMin: Math.min(...set.nodes.map(item => item.center.lng)),
      xMax: Math.max(...set.nodes.map(item => item.center.lng)),
      yMin: Math.min(...set.nodes.map(item => item.center.lat)),
      yMax: Math.max(...set.nodes.map(item => item.center.lat))
    };
  } else {
    return {
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
  }
};

export default createAreaDomain;
