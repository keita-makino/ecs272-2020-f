import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL, { Layer } from 'react-map-gl';

import { PolygonLayer, LineLayer } from 'deck.gl';
import { useWindowSize } from 'react-use';
import usePlotData from '../../uses/usePlotData';
import { useCurrentUser } from '../../uses/useUser';
import { useApolloClient } from '@apollo/react-hooks';
import { EditableGeoJsonLayer, TranslateMode } from 'nebula.gl';
import { Scatters } from '../../uses/useScatters';
import useBusy, { changeBusy } from '../../uses/useBusy';
import ToolTip, { ToolTipProps } from '../molecules/ToolTip';
import updateVis from '../../utils/updateVis';
import { useCurrentRoom } from '../../uses/useRoom';
import AddRecordToolTip, {
  AddRecordToolTipProps
} from '../molecules/AddRecordToolTip';
import initializeGeocoder from '../../utils/geocoder';

export type MapProps = {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  };
};

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2VtYWtpbm8iLCJhIjoiY2s1aHJkeWVpMDZzbDNubzltem80MGdnZSJ9.Mn_8DItICHFJyiPJ2rP_0Q';

const Map = (props: MapProps) => {
  const plotData = usePlotData();
  const [scatters, setScatters] = useState<Scatters | undefined>(undefined);
  const [selected, setSelected] = useState(-1);
  const [addRecordTooltip, setAddRecordTooltip] = useState<
    AddRecordToolTipProps
  >();
  const [tooltip, setTooltip] = useState<ToolTipProps>();
  const user = useCurrentUser();
  const room = useCurrentRoom();
  const geocoder = initializeGeocoder(
    'AIzaSyBnY-e-cooj3Al00CsgEY53K8nUD32T2f0'
  );

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
          getPolygon: (d: { contour: any }) => d.contour,
          getFillColor: (d: { color: any }) => d.color
        })
      : undefined,
    user?.setting.edge
      ? new LineLayer({
          id: 'lineLayer',
          data: plotData.edges!,
          getSourcePosition: (d: { start: any }) => d.start,
          getTargetPosition: (d: { end: any }) => d.end,
          getColor: (d: { color: any }) => d.color
        })
      : undefined,
    user?.setting.scatter
      ? new EditableGeoJsonLayer({
          id: 'geojsonLayer',
          data: scatters,
          mode: TranslateMode,
          selectedFeatureIndexes: [selected],
          filled: true,
          stroked: true,
          getLineWidth: 5 / Math.log(view.zoom),
          getRadius: user?.setting.markSize * 25000 || 40,
          getFillColor: (d: any) =>
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
    <>
      <ToolTip {...(tooltip as ToolTipProps)} />
      <AddRecordToolTip {...(addRecordTooltip as AddRecordToolTipProps)} />
      <DeckGL
        width={window.width}
        height={window.height}
        viewState={view}
        layers={layer}
        getCursor={() => (editMode ? 'crosshair' : 'pointer')}
        onClick={
          editMode
            ? (info: any) => {
                setSelected(info.index);
                if (info.index === -1 && !addRecordTooltip) {
                  geocoder.reverseGeocode(
                    {
                      latlng: {
                        lat: info.coordinate[1],
                        lng: info.coordinate[0]
                      }
                    },
                    (error: any, result: any) => {
                      setAddRecordTooltip({
                        address: result.json.results[0].formatted_address,
                        x: info.x + 16,
                        y: info.y + 16,
                        lat: info.coordinate[1],
                        lng: info.coordinate[0],
                        setAddRecordTooltip: setAddRecordTooltip
                      });
                    }
                  );
                }
              }
            : (info: any) => {
                setAddRecordTooltip(undefined);
                if (info.object?.properties?.type) {
                  setTooltip({
                    id: info.object.properties.id,
                    type: info.object.properties.type,
                    name: info.object.properties.name,
                    address: info.object.properties.address,
                    x: info.x + 16,
                    y: info.y + 16,
                    setTooltip: setTooltip
                  });
                } else {
                  setTooltip(undefined);
                }
              }
        }
        onDragStart={() => setTooltip(undefined)}
        controller={!editMode && true}
        onViewStateChange={({ viewState }) => setView(viewState)}
      >
        {background}
      </DeckGL>
    </>
  );
};

export default Map;
