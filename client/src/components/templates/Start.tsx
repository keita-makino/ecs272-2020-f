import React from 'react';
import { Grid } from '@material-ui/core';
import StartPanel from '../organisms/StartPanel';

type Props = {};

const Start: React.FC<Props> = () => {
  return (
    <Grid
      container
      xs={12}
      alignContent={'center'}
      style={{ position: 'absolute', width: '100vw', height: '100vh' }}
    >
      <StartPanel />
    </Grid>
  );
};

export default Start;
