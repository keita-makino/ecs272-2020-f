import { RGBAColor } from 'deck.gl';
import { useState, useEffect } from 'react';
import useFilteredData from './useFilteredData';
import { useCurrentUser } from './useUser';

type Feature = {
  type: string;
  properties: {
    id: number;
    fillColor: RGBAColor;
    markSize: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

export type Scatters = {
  type: string;
  features?: Feature[];
};

const useScatters = (): Scatters | undefined => {
  const recordTypes = useFilteredData();
  const data = useCurrentUser();
  const [scatters, setScatters] = useState<Scatters | undefined>(undefined);

  useEffect(() => {
    const f = async () => {
      if (!recordTypes) {
        return;
      }
      const newRecordTypes = recordTypes
        .map((item, index) =>
          item.record.map(record => ({
            type: 'Feature',
            properties: {
              id: record.id,
              fillColor: item.color,
              type: item.name,
              typeId: item.id,
              name: record.name,
              address: record.address
            },
            geometry: {
              type: 'Point',
              coordinates: [
                record.lng,
                record.lat,
                index * (data?.user?.setting.height || 15)
              ]
            }
          }))
        )
        .flat(2);
      setScatters({
        type: 'FeatureCollection',
        features: newRecordTypes
      });
    };
    if (recordTypes) {
      f();
    }
  }, [recordTypes, data?.user]);

  return scatters;
};

export default useScatters;
