import { RGBAColor } from 'deck.gl';
import { RecordType } from './usePlotData';
import { useState, useEffect } from 'react';

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

const useScatters = (recordTypes?: RecordType[]): Scatters | undefined => {
  const [scatters, setScatters] = useState<Scatters | undefined>(undefined);

  useEffect(() => {
    console.log(1);
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
              markSize: 'medium'
            },
            geometry: {
              type: 'Point',
              coordinates: [record.lng, record.lat]
            }
          }))
        )
        .flat(2);
      console.log(newRecordTypes);
      setScatters({
        type: 'FeatureCollection',
        features: newRecordTypes
      });
    };
    if (recordTypes) {
      console.log(recordTypes);
      f();
    }
  }, [recordTypes]);

  return scatters;
};

export default useScatters;
