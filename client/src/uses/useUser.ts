import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { mockUser } from '../data/mock';

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(where: { id: $id }) {
      id
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

export const GET_CURRENT_USER_ID = gql`
  query {
    session @client {
      userId
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($newData: UserCreateInput!) {
    createOneUser(data: $newData) {
      id
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

export const useCurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER_ID);

  return useUser(data?.session.userId);
};

export const useUser = (id?: string) => {
  const { data } = useQuery(GET_USER, {
    variables: { id: id }
  });

  return data;
};
