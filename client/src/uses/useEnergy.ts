import React, { useState, useEffect } from 'react';
import { LocationSet } from '../types/LocationSet';
import { Location } from '../types/Location';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../utils/shapeSetConstructor';
import { ShapeSetActive, ShapeSetBase } from '../types/ShapeSet';

const useEnergy = (sets?: LocationSet[]) => {
  const [energy, setEnergy] = useState<LocationSet[]>([]);

  useEffect(() => {
    const f = async (sets: LocationSet[]) => {
      sets.map(async (item, index, array) => {
        const activeLocations = createShapeSet<ShapeSetActive>(
          item.locations,
          () => true
        );
        const inactiveLocations = createShapeSet<ShapeSetBase>(
          array
            .filter(item2 => item2.type !== item.type)
            .reduce(
              (prev: Location[], curr: LocationSet) => [
                ...prev,
                ...curr.locations
              ],
              []
            ),
          () => false
        );
        const virtualEdges = await getVirtualEdges(
          activeLocations,
          inactiveLocations
        );
        console.log(virtualEdges);
      });
      return sets;
    };

    if (sets) {
      f(sets);
    }
  }, [sets]);

  return energy;
};

export default useEnergy;
