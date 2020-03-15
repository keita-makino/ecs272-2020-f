import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Switch from '@material-ui/core/Switch';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

export type ToggleLabelProps = {};

export const GET_MODE = gql`
  query GetMode {
    session @client {
      editMode
      __typename
    }
  }
`;

const ChangeMode: React.FC<ToggleLabelProps> = () => {
  const client = useApolloClient();
  const { data: session } = useQuery(GET_MODE);
  const mode = session?.session.editMode;
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const data = client.readQuery<any>({ query: GET_MODE });
    client.writeQuery({
      query: GET_MODE,
      data: {
        session: { ...data.session, editMode: checked }
      }
    });
  };

  return (
    <>
      <Typography variant="body1" align={'right'}>
        View
      </Typography>
      <Switch checked={mode || false} onChange={onChange} />
      <Typography variant="body1">Edit</Typography>
    </>
  );
};

export default ChangeMode;
