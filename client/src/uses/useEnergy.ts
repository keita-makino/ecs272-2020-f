import { useState, useEffect } from 'react';
import { LocationSet } from '../types/LocationSet';
import { Location } from '../types/Location';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { Node, Edge } from '../types/Shapes';
import getPotential from '../utils/getPotential';
import { createNode, createPoint } from '../constructors/shapeConstructors';

const useEnergy = (sets?: LocationSet[]) => {
  const [energy, setEnergy] = useState<Edge[][]>([]);

  useEffect(() => {
    const f = async (sets: LocationSet[]) => {
      const newSets = sets.map(
        async (item, index, array): Promise<Edge[]> => {
          const activeSet = createShapeSet(
            item.locations
              .slice(0, 10)
              .map(item => createNode(createPoint(item.lng, item.lat), 1)),
            'active'
          );
          const inactiveSet = createShapeSet(
            array
              .filter(item2 => item2.type !== item.type)
              .slice(0, 30)
              .reduce(
                (prev: Node[], curr: LocationSet) => [
                  ...prev,
                  ...curr.locations.map(item =>
                    createNode(createPoint(item.lng, item.lat), 1)
                  )
                ],
                []
              ),
            'base'
          );
          activeSet.edges = await getVirtualEdges(activeSet, inactiveSet);

          console.log(activeSet);

          await getPotential(activeSet, inactiveSet);

          return activeSet.edges;
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
