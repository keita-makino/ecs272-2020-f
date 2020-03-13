import { useState, useEffect } from 'react';
import { RecordSet } from '../types/LocationSet';
import { Record } from '../types/Location';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { Node, Edge, Point, Path } from '../types/Shapes';
import getPotential from '../utils/getPotential';
import { createNode, createPoint } from '../constructors/shapeConstructors';
import getPaths from '../utils/getPaths';
import isAllContained from '../utils/isAllContained';

const useContour = (sets?: RecordSet[]) => {
  const [contours, setContours] = useState<(Path | undefined)[]>([]);

  useEffect(() => {
    const f = async (sets: RecordSet[]) => {
      const newContours = sets.map(
        async (item, index, array): Promise<Path | undefined> => {
          const activeSet = createShapeSet(
            item.records
              .slice(0, 10)
              .map(item => createNode(createPoint(item.lng, item.lat), 1)),
            'active'
          );
          const inactiveSet = createShapeSet(
            array
              .filter(item2 => item2.name !== item.name)
              .slice(0, 30)
              .reduce(
                (prev: Node[], curr: RecordSet) => [
                  ...prev,
                  ...curr.records.map(item =>
                    createNode(createPoint(item.lng, item.lat), 1)
                  )
                ],
                []
              ),
            'base'
          );
          activeSet.edges = (await getVirtualEdges(activeSet, inactiveSet))
            .flat()
            .filter(item => item !== undefined);

          const path = getPotential(activeSet, inactiveSet);

          return path;
        }
      );
      setContours(await Promise.all(newContours));
    };

    if (sets) {
      f(sets);
    }
  }, [sets]);

  return contours;
};

export default useContour;
