import React from 'react';
import Typography from '@material-ui/core/Typography';

import Switch from '@material-ui/core/Switch';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Visibility, Edit } from '@material-ui/icons';

export type ToggleLabelProps = {};

export const GET_MODE = gql`
  query GetMode {
    session @client {
      editMode
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
      <Visibility />
      <Typography
        variant="body1"
        align={'right'}
        style={{ padding: '0 0.5rem' }}
      >
        View
      </Typography>
      <Switch checked={mode || false} onChange={onChange} />
      <Typography
        variant="body1"
        align={'right'}
        style={{ padding: '0 0.5rem' }}
      >
        Edit
      </Typography>
      <Edit />
    </>
  );
};

export default ChangeMode;
