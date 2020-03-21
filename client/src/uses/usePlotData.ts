import useContoursEdges, { ContoursEdges } from './useContoursEdges';
import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import useScatters, { Scatters } from './useScatters';
import { changeBusy } from './useBusy';

type PlotData = ContoursEdges & {
  scatters?: Scatters;
};

export type RecordType = {
  id: number;
  record: Records;
  name: string;
  color: [number, number, number];
  active: boolean;
};

export type Records = {
  id: number;
  lng: number;
  lat: number;
  name: string;
  address: string;
}[];

const usePlotData = (): PlotData => {
  const client = useApolloClient();
  const [plotData, setPlotData] = useState<PlotData>({});

  const contoursEdges = useContoursEdges();
  const scatters = useScatters();

  useEffect(() => {
    setPlotData({
      contours: contoursEdges.contours,
      edges: contoursEdges.edges,
      scatters: scatters
    });
    changeBusy('computing', false, client);
  }, [contoursEdges, scatters]);

  return plotData;
};

export default usePlotData;
