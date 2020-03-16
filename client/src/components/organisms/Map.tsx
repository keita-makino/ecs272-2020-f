import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL, { Layer } from 'react-map-gl';

import { ScatterplotLayer, PolygonLayer, RGBAColor, LineLayer } from 'deck.gl';
import { useWindowSize } from 'react-use';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import usePlotData from '../../uses/usePlotData';
import { useCurrentUser } from '../../uses/useUser';
import { GET_MODE } from '../molecules/ChangeMode';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import {
  EditableGeoJsonLayer,
  ModifyMode,
  ViewMode,
  DrawPointMode,
  TranslateMode,
  DrawPolygonMode
} from 'nebula.gl';
import { Scatters } from '../../uses/useScatters';
import useBusy, { changeBusy } from '../../uses/useBusy';
import ToolTip, { ToolTipProps } from '../molecules/ToolTip';
import updateVis from '../../utils/updateVis';
import { useCurrentRoom } from '../../uses/useRoom';

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
  const plotData = usePlotData();
  const [scatters, setScatters] = useState<Scatters | undefined>(undefined);
  const [selected, setSelected] = useState(-1);
  const [tooltip, setTooltip] = useState<ToolTipProps>();
  const user = useCurrentUser();
  const room = useCurrentRoom();

  const client = useApolloClient();
  const editMode = useBusy('editMode');
  const isModifying = useBusy('modifying');
  const isComputing = useBusy('computing');

  const window = useWindowSize();

  const [view, setView] = React.useState(props.viewState);

  useEffect(() => {
    setScatters(plotData?.scatters);
  }, [plotData]);

  useEffect(() => {
    if (editMode === false) {
      setSelected(-1);
    }
  }, [editMode]);

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
          onEdit: ({ updatedData, editType }: any) => {
            if (editType === 'translating' && !isModifying) {
              changeBusy('modifying', true, client);
            }
            if (!isComputing) {
              const record = updatedData.features[selected];
              updateVis(
                {
                  roomId: room.id,
                  id: record.properties.id,
                  type: record.properties.type,
                  lat: record.geometry.coordinates[1],
                  lng: record.geometry.coordinates[0]
                },
                client
              );
            }
            if (editType === 'translated') {
              changeBusy('modifying', false, client);
            }
            setScatters(updatedData);
          }
        })
      : undefined
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

  return (
    <Grid className={classes.mainVis}>
      <DeckGL
        width={window.width}
        height={window.height}
        viewState={view}
        layers={layer}
        onClick={
          editMode
            ? info => {
                if (info.index) {
                  setSelected(info.index);
                } else {
                  setSelected(-1);
                }
              }
            : (info: any) => {
                if (info.object?.properties?.type) {
                  setTooltip({
                    type: info.object.properties.type,
                    name: info.object.properties.name,
                    address: info.object.properties.address,
                    x: info.x + 16,
                    y: info.y + 16
                  });
                } else {
                  setTooltip(undefined);
                }
              }
        }
        onDragStart={info => setTooltip(undefined)}
        controller={!editMode && true}
        onViewStateChange={({ viewState }) => setView(viewState)}
      >
        <ToolTip {...(tooltip as ToolTipProps)} />
        {background}
      </DeckGL>
    </Grid>
  );
};

export default Map;
