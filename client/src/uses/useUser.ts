import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_USER = gql`
  query GetUser($id: Int) {
    user(where: { id: $id }) {
      id
      name
      setting {
        cellSize
        markSize
        darkMode
        scatter
        edge
        bubble
        height
      }
    }
  }
`;

const GET_CURRENT_USER_ID = gql`
  query {
    session @client {
      userId
      __typename
    }
  }
`;

export const useCurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER_ID);

  return useUser(data?.session.userId);
};

export const useUser = (id?: number) => {
  const { data } = useQuery(GET_USER, { variables: { id: id } });

  return data ? data.user : undefined;
};
