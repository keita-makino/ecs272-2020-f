import React from 'react';
import {
  Card,
  Grid,
  Typography,
  ButtonBase,
  Divider,
  Icon
} from '@material-ui/core';
import getIcon from '../../utils/getIcon';
import camelcase from 'camelcase';
import { HighlightOff } from '@material-ui/icons';

export type ToolTipProps = {
  type: string;
  name: string;
  address: string;
  x: number;
  y: number;
};

const ToolTip: React.FC<ToolTipProps> = (props: ToolTipProps) => {
  if (!props.name) return null;
  return (
    <Card
      style={{
        maxWidth: '20rem',
        position: 'absolute',
        zIndex: 7,
        top: props.y,
        left: props.x
      }}
    >
      <Grid
        container
        item
        xs={12}
        style={{
          padding: '0.3rem'
        }}
      >
        <Grid container item xs={2} alignItems={'center'} justify={'center'}>
          <Icon>{getIcon[camelcase(props.type)]}</Icon>
        </Grid>
        <Grid container item xs={9} alignItems={'center'}>
          <Typography variant={'h6'}>{props.name}</Typography>
        </Grid>
        <Grid container item xs={1} alignItems={'center'}>
          <ButtonBase>
            <HighlightOff color={'error'} />
          </ButtonBase>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        item
        xs={12}
        style={{
          padding: '0.3rem'
        }}
      >
        <Typography variant={'body1'}>{props.address}</Typography>
      </Grid>
    </Card>
  );
};

export default ToolTip;
