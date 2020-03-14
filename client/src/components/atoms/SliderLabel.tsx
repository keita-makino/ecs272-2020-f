import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { Slider as SliderMUI } from '@material-ui/core';
import { useCurrentUser } from '../../uses/useUser';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from './ToggleLabel';
import camelcase from 'camelcase';

export type SliderLabelProps = { label: string };

const SliderLabel: React.FC<SliderLabelProps> = (props: SliderLabelProps) => {
  const user = useCurrentUser();
  const [status, setStatus] = useState<[number, boolean]>([0, false]);
  const [mutation] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (user) {
      setStatus([user.setting[camelcase(props.label)], true]);
      delete user.__typename;
    }
  }, [user]);

  const onChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    setStatus([value as number, true]);
  };

  const onChangeCommitted = (
    event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    setStatus([value as number, false]);
    mutation({
      variables: {
        newData: { setting: { update: { [camelcase(props.label)]: value } } },
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
      <Grid xs={4}>
        <Typography variant={'body1'}>{props.label}</Typography>
      </Grid>
      <Grid xs={8}>
        <SliderMUI
          value={status[0]}
          disabled={!status[1]}
          onChange={onChange}
          onChangeCommitted={onChangeCommitted}
        />
      </Grid>
    </Grid>
  );
};

export default SliderLabel;
