import { useState, useEffect } from 'react';
import { LocationSet } from '../types/LocationSet';
import { Location } from '../types/Location';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../utils/shapeSetConstructor';
import { createNode, createPoint } from '../utils/shapeConstructors';
import { Node, Edge } from '../types/Shapes';

const useEnergy = (sets?: LocationSet[]) => {
  const [energy, setEnergy] = useState<Edge[][]>([]);

  useEffect(() => {
    const f = async (sets: LocationSet[]) => {
      const newSets = sets.map(
        async (item, index, array): Promise<Edge[]> => {
          const activeSet = createShapeSet(
            item.locations.map(item =>
              createNode(createPoint(item.lat, item.lng), 1)
            ),
            'active'
          );
          const inactiveSet = createShapeSet(
            array
              .filter(item2 => item2.type !== item.type)
              .reduce(
                (prev: Node[], curr: LocationSet) => [
                  ...prev,
                  ...curr.locations.map(item =>
                    createNode(createPoint(item.lat, item.lng), 1)
                  )
                ],
                []
              ),
            'base'
          );
          const virtualEdges: Edge[] = await getVirtualEdges(
            activeSet,
            inactiveSet
          );
          return virtualEdges;
        }
      );
      setEnergy(await Promise.all(newSets));
    };

    if (sets) {
      f(sets);
    }
  }, [sets]);

  return energy;
};

export default useEnergy;
