import { ApolloClient, gql } from 'apollo-boost';
import { GET_ROOM, useCurrentRoom } from '../uses/useRoom';
import { DragRotateHandler } from 'mapbox-gl';

type UpdateVisData = {
  roomId: number;
  id: number;
  type: string;
  lat: number;
  lng: number;
};

const updateVis = (data: UpdateVisData, client: ApolloClient<object>) => {
  const { room } = client.readQuery<any>({
    query: GET_ROOM,
    variables: { id: data.roomId }
  });
  const typeIndex = room.recordType.findIndex(
    (item: any) => item.name === data.type
  );
  const recordIndex = room.recordType[typeIndex].record.findIndex(
    (item: any) => item.id === data.id
  );

  const newElement = {
    ...room.recordType[typeIndex].record[recordIndex],
    lat: data.lat,
    lng: data.lng
  };

  const newRoom = {
    ...room,
    recordType: [
      ...room.recordType.filter((item: any, index: any) => index !== typeIndex),
      {
        ...room.recordType[typeIndex],
        record: [
          ...room.recordType[typeIndex].record.filter(
            (item: any, index: any) => index !== recordIndex
          ),
          newElement
        ].sort((a, b) => (a.id < b.id ? -1 : 1))
      }
    ].sort((a, b) => (a.id < b.id ? -1 : 1))
  };

  client.writeQuery({
    query: GET_ROOM,
    data: {
      room: newRoom
    }
  });
};

export default updateVis;
