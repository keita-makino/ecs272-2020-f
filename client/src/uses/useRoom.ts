import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_ROOM = gql`
  query GetRoom($id: Int) {
    room(where: { id: $id }) {
      id
      name
      recordType(orderBy: { id: asc }) {
        id
        name
        active
        color
      }
    }
  }
`;

const GET_CURRENT_ROOM_ID = gql`
  query {
    session @client {
      roomId
      __typename
    }
  }
`;

export const useCurrentRoom = () => {
  const { data } = useQuery(GET_CURRENT_ROOM_ID);

  return useRoom(data?.session.roomId);
};

export const useRoom = (id?: number) => {
  const { data } = useQuery(GET_ROOM, { variables: { id: id } });

  return data ? data.room : undefined;
};
