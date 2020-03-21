import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ChangeMode from '../molecules/ChangeMode';
import zIndex from '@material-ui/core/styles/zIndex';
import ShowComputing from '../molecules/ShowComputing';

export type MiddlePanelProps = {};

const useStyles = makeStyles({
  middlePanel: {
    maxWidth: '24rem',
    height: '2rem',
    position: 'relative',
    padding: '4rem 0',
    zIndex: 6
  }
});

const MiddlePanel: React.FC<MiddlePanelProps> = (props: MiddlePanelProps) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      className={classes.middlePanel}
      alignItems={'center'}
      alignContent={'stretch'}
      justify={'center'}
    >
      <ChangeMode />
    </Grid>
  );
};

export default MiddlePanel;
