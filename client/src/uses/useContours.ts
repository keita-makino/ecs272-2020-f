import { useState, useEffect } from 'react';
import { RecordSet } from '../types/RecordSet';
import getVirtualEdges from '../utils/getVirtualEdges';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { Node, Path } from '../types/Shapes';
import getContour from '../utils/getContour';
import { createNode, createPoint } from '../constructors/shapeConstructors';
import { RGBAColor } from 'deck.gl';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { RecordType, Records } from './usePlotData';

type Contours = {
  contour: [number, number][];
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

const useContoursEdges = (recordTypes?: RecordType[]): ContoursEdges => {
  const [contoursEdges, setContoursEdges] = useState<ContoursEdges>({
    contours: undefined,
    edges: undefined
  });

  useEffect(() => {
    const f = async () => {
      if (!recordTypes) {
        return;
      }
      const newContoursEdges = await Promise.all(
        recordTypes.map(
          async (
            item: RecordType,
            _index: number,
            array: RecordType[]
          ): Promise<[Contours[0], Edges]> => {
            const activeSet = createShapeSet(
              item.record.map((item: Records[0]) =>
                createNode(createPoint(item.lng, item.lat))
              ),
              'active'
            );
            const inactiveSet = createShapeSet(
              array
                .filter((item2: RecordType) => item2.name !== item.name)
                .map(item => item.record)
                .flat()
                .map((item: Records[0]) =>
                  createNode(createPoint(item.lng, item.lat))
                ),
              'base'
            );

            activeSet.edges = (await getVirtualEdges(activeSet, inactiveSet))
              .flat()
              .filter(item => item !== undefined);

            const contour = await getContour(activeSet, inactiveSet);

            return [
              {
                contour: contour.getCoordinates(),
                color: [...item.color, 30] as RGBAColor
              },
              activeSet.edges.map(edge => ({
                start: [edge.start.lng, edge.start.lat, 0],
                end: [edge.end.lng, edge.end.lat, 0],
                color: item.color
              }))
            ];
          }
        )
      );
      console.log(newContoursEdges);
      setContoursEdges({
        contours: newContoursEdges.map(item => item[0]),
        edges: newContoursEdges.map(item => item[1]).flat(1)
      });
    };

    if (recordTypes) {
      f();
    }
  }, [recordTypes]);

  return contoursEdges;
};

export default useContoursEdges;
