import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ChangeMode from '../molecules/ChangeMode';
import zIndex from '@material-ui/core/styles/zIndex';

export type MiddlePanelProps = {};

const useStyles = makeStyles({
  middlePanel: {
    width: '24rem',
    height: '2rem',
    position: 'relative',
    zIndex: 6,
    margin: '4rem auto'
  }
});

const MiddlePanel: React.FC<MiddlePanelProps> = (props: MiddlePanelProps) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      className={classes.middlePanel}
      alignItems={'baseline'}
    >
      <ChangeMode />
    </Grid>
  );
};

export default MiddlePanel;
