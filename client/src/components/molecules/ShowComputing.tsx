import React from 'react';
import useBusy from '../../uses/useBusy';
import { Card, Grid, Typography, Slide } from '@material-ui/core';

export type ShowComputingProps = {};

const ShowComputing: React.FC<ShowComputingProps> = (
  props: ShowComputingProps
) => {
  const isComputing = useBusy('computing');
  return (
    <Slide direction={'up'} in={isComputing}>
      <Card style={{ width: '20rem' }}>
        <Grid container item xs={12}>
          <Typography>Computing...</Typography>
        </Grid>
      </Card>
    </Slide>
  );
};

export default ShowComputing;
