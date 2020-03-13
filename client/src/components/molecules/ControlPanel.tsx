import React from 'react';
import Slider, { ControlProps } from '../atoms/Slider';
import { Grid, Typography } from '@material-ui/core';
import Toggle from '../atoms/Toggle';
import { Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

export type ControlPanelProps = {
  title: string;
  typeArray: ControlProps[];
};

const useStyles = makeStyles({
  root: {
    width: 300
  }
});

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      margin: theme.spacing(2, 0)
    }
  })
);

const ControlPanel: React.FC<ControlPanelProps> = (
  props: ControlPanelProps
) => {
  const classes = useStyles();
  const classes1 = useStyles1();
  return (
    <Grid className={classes.root}>
      <Typography variant="subtitle1">{props.title}</Typography>
      <Divider className={classes1.divider} />
      {props.typeArray.slice(0, 2).map(item => (
        <Slider type={item.type}></Slider>
      ))}
      <Toggle type={props.typeArray[2].type} />
    </Grid>
  );
};

export default ControlPanel;
