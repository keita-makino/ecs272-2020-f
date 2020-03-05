import React, { useState, useEffect } from 'react';
import { LocationSet } from '../types/LocationSet';

const useEnergy = (sets?: LocationSet[]) => {
  const [energy, setEnergy] = useState<LocationSet[]>([]);

  useEffect(() => {
    const f = async () => {
      return sets;
    };

    if (sets) {
      setEnergy(sets);
    }
  });

  return energy;
};

export default useEnergy;
