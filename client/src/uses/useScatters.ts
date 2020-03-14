import { RGBAColor } from 'deck.gl';
import { RecordType } from './usePlotData';
import { useState, useEffect } from 'react';

export type Scatters = {
  point: [number, number];
  color: RGBAColor;
}[];

const useScatters = (recordTypes?: RecordType[]): Scatters | undefined => {
  const [scatters, setScatters] = useState<Scatters | undefined>(undefined);

  useEffect(() => {
    const f = async () => {
      if (!recordTypes) {
        return;
      }
      const newRecordTypes = recordTypes
        .map((item, index) =>
          item.record.map(record => {
            return {
              point: [record.lng, record.lat],
              color: item.color
            };
          })
        )
        .flat(2);
      setScatters(newRecordTypes);
    };
    if (recordTypes) {
      f();
    }
  }, [recordTypes]);

  return scatters;
};

export default useScatters;
