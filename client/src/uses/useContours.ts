import { useState, useEffect } from 'react';
import { RecordSet } from '../types/RecordSet';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { Node, Path } from '../types/Shapes';
import getContour from '../utils/getContour';
import { createNode, createPoint } from '../constructors/shapeConstructors';

const useContours = (sets?: RecordSet[]) => {
  const [contours, setContours] = useState<Path[]>([]);

  useEffect(() => {
    const f = async (sets: RecordSet[]) => {
      const newContours = sets.map(
        async (item, index, array): Promise<Path> => {
          const activeSet = createShapeSet(
            item.records.map(item =>
              createNode(createPoint(item.lng, item.lat), 1)
            ),
            'active'
          );
          const inactiveSet = createShapeSet(
            array
              .filter(item2 => item2.name !== item.name)
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

          const contour = getContour(activeSet, inactiveSet);

          return contour;
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

export default useContours;
