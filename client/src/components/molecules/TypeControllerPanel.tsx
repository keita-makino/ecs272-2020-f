import React from 'react';
import TypeController, { TypeControllerProps } from '../atoms/TypeController';
import { Typography, Grid, makeStyles, Divider } from '@material-ui/core';

export type TypeControllerPanelProps = {
  title: string;
  typeArray: TypeControllerProps[];
};

const useStyles = makeStyles({
  containerLayers: {},
  titleLayers: {},
  allLayers: {}
});

const TypeControllerPanel: React.FC<TypeControllerPanelProps> = (
  props: TypeControllerPanelProps
) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        xs={4}
        className={classes.containerLayers}
        direction="column"
      >
        <Grid container item xs={12} className={classes.titleLayers}>
          <Typography variant="h6">{props.title}</Typography>
        </Grid>
        <Divider />
        <Grid
          container
          item
          xs={12}
          className={classes.allLayers}
          direction="column"
          justify="space-around"
          alignItems="stretch"
        >
          {props.typeArray.map(item => (
            <TypeController {...item}></TypeController>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default TypeControllerPanel;
