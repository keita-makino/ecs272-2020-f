import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { mockRecordType } from '../data/mock';

export const GET_ROOM = gql`
  query GetRoom($id: String!) {
    room(where: { id: $id }) {
      id
      recordType(orderBy: { id: asc }) {
        id
        name
        active
        color
        record {
          id
          lat
          lng
          name
          address
        }
      }
    }
  }
`;

export const GET_CURRENT_ROOM_ID = gql`
  query {
    session @client {
      roomId
    }
  }
`;

export const CREATE_NEW_ROOM = gql`
  mutation CreateNewRoom($newData: RoomCreateInput!) {
    createOneRoom(data: $newData) {
      id
      recordType(orderBy: { id: asc }) {
        id
        name
        active
        color
        record {
          id
          lat
          lng
          name
          address
        }
      }
    }
  }
`;

export const useCurrentRoom = () => {
  const { data } = useQuery(GET_CURRENT_ROOM_ID);

  return useRoom(data?.session.roomId);
};

export const useRoom = (id?: string) => {
  const { data } = useQuery(GET_ROOM, {
    variables: { id: id }
  });

  return data ? data.room : undefined;
};
