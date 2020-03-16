import { useState, useEffect } from 'react';
import { RecordType } from './usePlotData';
import { useCurrentRoom } from './useRoom';
import { changeBusy } from './useBusy';

const useFilteredData = () => {
  const [filtered, setFiltered] = useState<RecordType[]>([]);

  const data = useCurrentRoom();

  useEffect(() => {
    if (data) {
      setFiltered(
        data.recordType.filter((item: { active: any }) => item.active)
      );
    }
  }, [data]);

  return filtered;
};

export default useFilteredData;
