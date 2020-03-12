import React from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL, { Layer } from 'react-map-gl';

import initialState from '../../data/initialState';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ContourLayer, ScatterplotLayer, LineLayer, PathLayer } from 'deck.gl';
import useContour from '../../uses/useEnergy';
import { RecordSet } from '../../types/LocationSet';
import useColor from '../../uses/useColor';
import { hsl } from 'color-convert';

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
    }
  }
`;

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2VtYWtpbm8iLCJhIjoiY2s1aHJkeWVpMDZzbDNubzltem80MGdnZSJ9.Mn_8DItICHFJyiPJ2rP_0Q';

const Map: React.FC<Props> = (props: Props) => {
  const { data } = useQuery<{ recordTypes: RecordSet[] }>(query);
  console.log(hsl);
  const contours = useContour(data?.recordTypes);

  const [view, setView] = React.useState(initialState.viewState);

  const pathData = contours
    .map((item, index) =>
      item
        ? { index: index, path: item?.getCoordinates() }
        : { index: index, path: [[0, 0]] as [number, number][] }
    )
    .filter(item => item !== undefined);

  const scatterData = data?.recordTypes
    .map(item => item.records.slice(0, 10))
    .flat();

  const layer = [
    new PathLayer({
      id: 'lineLayer',
      data: pathData,
      getWidth: d => 3,
      getPath: d =>
        d!.path.map(item => [...item, 0] as [number, number, number]),
      getColor: d => [0, 150, 0]
    }),
    new ScatterplotLayer({
      id: 'layer',
      data: scatterData,
      pickable: true,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => [d.lng, d.lat],
      getRadius: d => 5,
      getFillColor: d => [255, 0, 0],
      getLineColor: d => [0, 0, 0]
    })
  ];

  return (
    <DeckGL
      width={1280}
      height={720}
      viewState={view}
      layers={layer}
      controller
      onViewStateChange={({ viewState }) => setView(viewState)}
    >
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width={960}
        height={600}
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
