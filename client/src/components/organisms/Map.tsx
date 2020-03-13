import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL, { Layer } from 'react-map-gl';

import initialState from '../../data/initialState';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  ContourLayer,
  ScatterplotLayer,
  LineLayer,
  PathLayer,
  PolygonLayer,
  RGBAColor
} from 'deck.gl';
import useContours from '../../uses/useContours';
import { RecordSet } from '../../types/RecordSet';
import useColor from '../../uses/useColor';
import { useWindowSize } from 'react-use';

type Props = {};

const query = gql`
  query {
    recordTypes {
      name
      records {
        lat
        lng
        name
        address
      }
      color
    }
  }
`;

type AreaData = {
  contour: [number, number][];
  color: RGBAColor;
}[];
type ScatterData = {
  point: [number, number];
  color: RGBAColor;
}[];

type PlotData = {
  area?: AreaData;
  scatter?: ScatterData;
};

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2VtYWtpbm8iLCJhIjoiY2s1aHJkeWVpMDZzbDNubzltem80MGdnZSJ9.Mn_8DItICHFJyiPJ2rP_0Q';

const Map: React.FC<Props> = (props: Props) => {
  const { data } = useQuery<{ recordTypes: RecordSet[] }>(query);
  const contours = useContours(data?.recordTypes);
  const recordTypes = data?.recordTypes!;
  const colors = (opacity: number) =>
    data?.recordTypes.map(item => [...item.color, opacity] as RGBAColor) || [
      [0, 0, 0, 100]
    ];
  const window = useWindowSize();

  const [view, setView] = React.useState(initialState.viewState);

  const [plotData, setPlotData] = useState<PlotData>();

  useEffect(() => {
    const f = async () => {
      const area = contours.map((item, index) =>
        item
          ? { contour: item.getCoordinates(), color: colors(33)[index] }
          : {
              contour: [[0, 0]] as [number, number][],
              color: colors(33)[index]
            }
      );
      const scatter = recordTypes
        .map((item, index) =>
          item.records.map(record => {
            const color = colors(100)[index];
            return { point: [record.lng, record.lat], color: color };
          })
        )
        .flat(2);
      console.log(scatter);
      setPlotData({ area: area, scatter: scatter });
    };
    if (data) {
      f();
    }
  }, [contours, recordTypes]);

  const layer = plotData
    ? [
        new PolygonLayer<AreaData[0]>({
          id: 'polygonLayer',
          data: plotData.area!,
          extruded: false,
          stroked: true,
          getPolygon: d => d.contour,
          getFillColor: d => d.color
        }),
        new ScatterplotLayer({
          id: 'scatterplotLayer',
          data: plotData.scatter!,
          pickable: true,
          stroked: true,
          filled: true,
          radiusScale: 6,
          radiusMinPixels: 1,
          radiusMaxPixels: 100,
          lineWidthMinPixels: 1,
          getPosition: d => d.point,
          getRadius: d => 5,
          getFillColor: d => d.color,
          getLineColor: d => [0, 0, 0]
        })
      ]
    : [];

  return (
    <DeckGL
      width={window.width}
      height={window.height}
      viewState={view}
      layers={layer}
      controller
      onViewStateChange={({ viewState }) => setView(viewState)}
    >
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width={window.width}
        height={window.height}
        mapStyle={'mapbox://styles/mapbox/light-v10'}
      >
        <Layer
          id={'height'}
          type={'fill-extrusion'}
          source={'composite'}
          source-layer={'building'}
          paint={{
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }}
        />
      </ReactMapGL>
    </DeckGL>
  );
};

export default Map;
