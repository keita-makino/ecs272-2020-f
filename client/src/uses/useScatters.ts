import { RGBAColor } from 'deck.gl';
import { RecordType } from './usePlotData';
import { useState, useEffect } from 'react';
import useFilteredData from './useFilteredData';

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
              name: record.name,
              address: record.address
            },
            geometry: {
              type: 'Point',
              coordinates: [record.lng, record.lat]
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
  }, [recordTypes]);

  return scatters;
};

export default useScatters;
