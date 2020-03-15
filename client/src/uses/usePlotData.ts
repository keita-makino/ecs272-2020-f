import useContoursEdges, { ContoursEdges } from './useContours';
import { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import useScatters, { Scatters } from './useScatters';
import { useCurrentRoom } from './useRoom';

type PlotData = ContoursEdges & {
  scatters?: Scatters;
};

export type RecordType = {
  record: Records;
  name: string;
  color: [number, number, number];
  active: boolean;
};

export type Records = {
  id: number;
  lng: number;
  lat: number;
}[];

const usePlotData = (): [PlotData, boolean] => {
  const data = useCurrentRoom();
  const [filtered, setFiltered] = useState<RecordType[]>([]);
  const [plotData, setPlotData] = useState<PlotData>({});
  const [loading, setLoading] = useState(false);

  const contoursEdges = useContoursEdges(filtered);
  const scatters = useScatters(filtered);

  useEffect(() => {
    if (data) {
      console.log(data);
      setLoading(true);
      setFiltered(
        data.recordType.filter((item: { active: any }) => item.active)
      );
    }
  }, [data]);

  useEffect(() => {
    setPlotData({
      contours: contoursEdges.contours,
      edges: contoursEdges.edges,
      scatters: scatters
    });
    setLoading(false);
  }, [contoursEdges, scatters]);

  return [plotData, loading];
};

export default usePlotData;
