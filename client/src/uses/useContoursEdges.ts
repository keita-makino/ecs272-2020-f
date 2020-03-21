import { useState, useEffect } from 'react';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import getContour from '../utils/getContour';
import { createNode, createPoint } from '../constructors/shapeConstructors';
import { RGBAColor } from 'deck.gl';
import { RecordType, Records } from './usePlotData';
import useFilteredData from './useFilteredData';
import { useCurrentUser } from './useUser';
import useBusy, { changeBusy } from './useBusy';
import { useApolloClient } from '@apollo/react-hooks';

type Contours = {
  contour: [number, number, number][];
  color: RGBAColor;
}[];
type Edges = {
  start: [number, number, number];
  end: [number, number, number];
  color: RGBAColor;
}[];

export type ContoursEdges = {
  contours?: Contours;
  edges?: Edges;
};

const useContoursEdges = (): ContoursEdges => {
  const recordTypes = useFilteredData();
  const client = useApolloClient();
  const data = useCurrentUser();
  const isModifying = useBusy('modifying');
  const [contoursEdges, setContoursEdges] = useState<ContoursEdges>({
    contours: undefined,
    edges: undefined
  });

  useEffect(() => {
    const f = async () => {
      if (!recordTypes || !data?.user) {
        return;
      }
      const newContoursEdges = await Promise.all(
        recordTypes.map(
          async (
            item: RecordType,
            index: number,
            array: RecordType[]
          ): Promise<[Contours, Edges]> => {
            const activeSet = createShapeSet(
              item.record.map((item: Records[0]) =>
                createNode(
                  createPoint(item.lng, item.lat),
                  data?.user.setting.markSize
                )
              ),
              'active'
            );

            if (activeSet.nodes.length === 0) {
              return [[], []];
            }

            const inactiveSet = createShapeSet(
              array
                .filter((item2: RecordType) => item2.name !== item.name)
                .map(item => item.record)
                .flat()
                .map((item: Records[0]) =>
                  createNode(
                    createPoint(item.lng, item.lat),
                    data?.user.setting.markSize
                  )
                ),
              'base'
            );

            activeSet.edges = (await getVirtualEdges(activeSet, inactiveSet))
              .flat()
              .filter(item => item !== undefined);

            const contour = await getContour(
              activeSet,
              inactiveSet,
              data?.user.setting.cellSize * (isModifying ? 2 : 1)
            );

            return [
              contour.map(item2 => ({
                contour: item2
                  .getCoordinates()
                  .map(
                    item =>
                      [...item, index * (data?.user?.setting.height || 15)] as [
                        number,
                        number,
                        number
                      ]
                  ),
                color: [...item.color, 30] as RGBAColor
              })),
              activeSet.edges.map(edge => ({
                start: [
                  edge.start.lng,
                  edge.start.lat,
                  index * (data?.user?.setting.height || 15)
                ],
                end: [
                  edge.end.lng,
                  edge.end.lat,
                  index * (data?.user?.setting.height || 15)
                ],
                color: item.color
              }))
            ];
          }
        )
      );
      setContoursEdges({
        contours: newContoursEdges.flatMap(item => item[0]),
        edges: newContoursEdges.map(item => item[1]).flat(1)
      });
      changeBusy('isLoading', false, client);
    };

    if (recordTypes) {
      f();
    }
  }, [recordTypes, data?.user, isModifying]);

  return contoursEdges;
};

export default useContoursEdges;
