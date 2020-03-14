import useContoursEdges, { ContoursEdges } from './useContours';
import { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import useScatters, { Scatters } from './useScatters';

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
  lng: number;
  lat: number;
}[];

const GET_RECORD_TYPES = gql`
  query {
    recordTypes {
      name
      record {
        lng
        lat
      }
      color
      active
    }
  }
`;

const usePlotData = (): PlotData => {
  const { data } = useQuery(GET_RECORD_TYPES);
  const [filtered, setFiltered] = useState<RecordType[]>([]);
  const [plotData, setPlotData] = useState<PlotData>({});

  const contoursEdges = useContoursEdges(filtered);
  const scatters = useScatters(filtered);

  useEffect(() => {
    if (data) {
      setFiltered(
        data.recordTypes.filter((item: { active: any }) => item.active)
      );
    }
  }, [data]);

  useEffect(() => {
    setPlotData({
      contours: contoursEdges.contours,
      edges: contoursEdges.edges,
      scatters: scatters
    });
  }, [contoursEdges, scatters]);

  return plotData;
};

export default usePlotData;
