import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_ROOM = gql`
  query GetRoom($id: Int) {
    room(where: { id: $id }) {
      id
      name
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
