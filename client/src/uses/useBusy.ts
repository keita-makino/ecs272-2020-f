import { gql, ApolloClient } from 'apollo-boost';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

const GET_BUSY = gql`
  query {
    session @client {
      editMode
      computing
      modifying
      isLoading
    }
  }
`;

const useBusy = (type: string) => {
  const { data } = useQuery(GET_BUSY);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (data) {
      setState(data.session[type]);
    }
  }, [data]);

  return state;
};

export const changeBusy = (
  type: string,
  changeTo: boolean,
  client: ApolloClient<object>
) => {
  const { session } = client.readQuery<any>({ query: GET_BUSY });
  client.writeQuery({
    query: GET_BUSY,
    data: {
      session: {
        ...session,
        [type]: changeTo
      }
    }
  });
};

export default useBusy;
