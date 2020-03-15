import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL, { Layer } from 'react-map-gl';

import { ScatterplotLayer, PolygonLayer, RGBAColor, LineLayer } from 'deck.gl';
import { useWindowSize } from 'react-use';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import usePlotData from '../../uses/usePlotData';
import { useCurrentUser } from '../../uses/useUser';
import { GET_MODE } from '../molecules/ChangeMode';
import { useQuery } from '@apollo/react-hooks';
import {
  EditableGeoJsonLayer,
  ModifyMode,
  ViewMode,
  DrawPointMode,
  TranslateMode,
  DrawPolygonMode
} from 'nebula.gl';
import { Scatters } from '../../uses/useScatters';

export type MapProps = {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  };
};

const useStyles = makeStyles(() => ({
  mainVis: {
    position: 'absolute'
  }
}));

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2VtYWtpbm8iLCJhIjoiY2s1aHJkeWVpMDZzbDNubzltem80MGdnZSJ9.Mn_8DItICHFJyiPJ2rP_0Q';

const Map = (props: MapProps) => {
  const classes = useStyles();
  const [plotData, loading] = usePlotData();
  const [scatters, setScatters] = useState<Scatters | undefined>(undefined);
  const [selected, setSelected] = useState(-1);
  const user = useCurrentUser();

  const window = useWindowSize();

  const [view, setView] = React.useState(props.viewState);

  useEffect(() => {
    console.log('updating');
    setScatters(plotData?.scatters);
  }, [plotData]);

  const layer = [
    user?.setting.bubble
      ? new PolygonLayer({
          id: 'polygonLayer',
          data: plotData.contours!,
          extruded: false,
          stroked: true,
          getPolygon: d => d.contour,
          getFillColor: d => d.color
        })
      : undefined,
    user?.setting.edge
      ? new LineLayer({
          id: 'lineLayer',
          data: plotData.edges!,
          getSourcePosition: d => d.start,
          getTargetPosition: d => d.end,
          getColor: d => d.color
        })
      : undefined,
    user?.setting.scatter
      ? new EditableGeoJsonLayer({
          id: 'geojsonLayer',
          data: scatters,
          mode: TranslateMode,
          selectedFeatureIndexes: [selected],
          filled: true,
          stroked: (d: any, b: boolean) => b,
          getRadius: 40,
          getFillColor: (d: any, b: boolean) =>
            d.properties.fillColor
              ? d.properties.fillColor
              : [125, 255, 255, 255],
          pickable: true,
          onEdit: ({ updatedData }: any) => {
            setScatters(updatedData);
          }
        })
      : undefined
    // user?.setting.scatter
    //   ? new ScatterplotLayer({
    //       id: 'scatterplotLayer',
    //       data: plotData.scatters!,
    //       pickable: true,
    //       stroked: true,
    //       filled: true,
    //       radiusScale: 6,
    //       radiusMinPixels: 1,
    //       radiusMaxPixels: 100,
    //       lineWidthMinPixels: 1,
    //       getPosition: d => d.point,
    //       getRadius: () => 5,
    //       getFillColor: d => d.color,
    //       getLineColor: () => [0, 0, 0]
    //     })
    //   : undefined
  ].filter(item => item !== undefined) as any[];

  const background = (
    <ReactMapGL
      mapboxApiAccessToken={MAPBOX_TOKEN}
      width={window.width}
      height={window.height}
      mapStyle={
        user
          ? user.setting.darkMode
            ? 'mapbox://styles/mapbox/dark-v10'
            : 'mapbox://styles/mapbox/light-v10'
          : 'mapbox://styles/mapbox/light-v10'
      }
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
  );

  const { data } = useQuery(GET_MODE);

  return (
    <Grid className={classes.mainVis}>
      <DeckGL
        width={window.width}
        height={window.height}
        viewState={view}
        layers={layer}
        onClick={
          data?.session.editMode
            ? info => {
                if (info.index) {
                  setSelected(info.index);
                } else {
                  setSelected(-1);
                }
              }
            : undefined
        }
        controller={!data?.session.editMode && true}
        onViewStateChange={({ viewState }) => setView(viewState)}
      >
        {background}
      </DeckGL>
    </Grid>
  );
};

export default Map;
