import React from 'react';
import SliderLabel, { SliderLabelProps } from '../atoms/SliderLabel';
import { Grid, Typography } from '@material-ui/core';
import ToggleLabel, { ToggleLabelProps } from '../atoms/ToggleLabel';
import { Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

export type ControlPanelProps = {
  title: string;
  sliderArray: SliderLabelProps[];
  toggleArray: ToggleLabelProps[];
};

const ControlPanel: React.FC<ControlPanelProps> = (
  props: ControlPanelProps
) => {
  return (
    <Grid style={{ paddingTop: '2rem' }}>
      <Typography variant="h6">{props.title}</Typography>
      <Divider />
      {props.sliderArray.map(item => (
        <SliderLabel label={item.label}></SliderLabel>
      ))}
      {props.toggleArray.map(item => (
        <ToggleLabel label={item.label} />
      ))}
    </Grid>
  );
};

export default ControlPanel;
