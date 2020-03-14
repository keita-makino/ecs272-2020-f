import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Switch from '@material-ui/core/Switch';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useCurrentUser, GET_USER } from '../../uses/useUser';
import camelcase from 'camelcase';

export type ToggleLabelProps = { label: string };

export const UPDATE_USER = gql`
  mutation UpdateUser($newData: UserUpdateInput!, $id: Int!) {
    updateOneUser(data: $newData, where: { id: $id }) {
      id
      name
      setting {
        darkMode
        cellSize
        markSize
      }
    }
  }
`;

const ToggleLabel: React.FC<ToggleLabelProps> = (props: ToggleLabelProps) => {
  const user = useCurrentUser();
  const [status, setStatus] = useState<[boolean, boolean]>([false, false]);
  const [mutation] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (user) {
      setStatus([user.setting[camelcase(props.label)], true]);
      delete user.__typename;
    }
  }, [user]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setStatus([checked, false]);
    mutation({
      variables: {
        newData: { setting: { update: { [camelcase(props.label)]: checked } } },
        id: user.id
      }
    });
  };

  return (
    <Grid
      container
      item
      xs={12}
      style={{ height: '3rem' }}
      alignItems={'center'}
    >
      <Grid item xs={10}>
        <Typography variant="body1">{props.label}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Switch checked={status[0]} disabled={!status[1]} onChange={onChange} />
      </Grid>
    </Grid>
  );
};

export default ToggleLabel;
