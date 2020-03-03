import React from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL, { Layer } from 'react-map-gl';

import initialState from '../../data/initialState';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ContourLayer } from 'deck.gl';
import usePowers from '../../uses/usePowers';

type Props = {};

const query = gql`
  query {
    records {
      id
      lat
      lng
      name
      address
    }
  }
`;

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2VtYWtpbm8iLCJhIjoiY2s1aHJkeWVpMDZzbDNubzltem80MGdnZSJ9.Mn_8DItICHFJyiPJ2rP_0Q';

const Map: React.FC<Props> = (props: Props) => {
  const { data } = useQuery(query);
  usePowers();
  const coordinates = data?.records.map(
    (item: { address: any; lng: any; lat: any }) => ({
      ADDRESS: item.address,
      RACKS: 10,
      SPACES: 20,
      COORDINATES: [item.lng, item.lat]
    })
  );
  console.log(coordinates);
  const [view, setView] = React.useState(initialState.viewState);

  const CONTOURS = [
    { threshold: 1, color: [255, 0, 0, 255], strokeWidth: 1 }, // => Isoline for threshold 1
    { threshold: 5, color: [0, 255, 0], strokeWidth: 2 }, // => Isoline for threshold 5
    { threshold: [6, 10], color: [0, 0, 255, 128] } // => Isoband for threshold range [6, 10)
  ];

  const layer = [
    new ContourLayer({
      id: 'layer',
      data: coordinates,
      contours: CONTOURS,
      cellSize: 200,
      getPosition: (node: any) => node.COORDINATES
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
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
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
