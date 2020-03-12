import { useState, useEffect } from 'react';
import { RecordSet } from '../types/LocationSet';
import { Record } from '../types/Location';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { Node, Edge } from '../types/Shapes';
import getPotential from '../utils/getPotential';
import { createNode, createPoint } from '../constructors/shapeConstructors';

const useEnergy = (sets?: RecordSet[]) => {
  const [energy, setEnergy] = useState<Edge[][]>([]);

  useEffect(() => {
    const f = async (sets: RecordSet[]) => {
      const newSets = sets.map(
        async (item, index, array): Promise<Edge[]> => {
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
