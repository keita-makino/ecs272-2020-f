import React from 'react';

import Map, { MapProps } from '../organisms/Map';
import Sidebar, { SidebarProps } from '../organisms/Sidebar';
import { makeStyles, Grid, Theme, Box } from '@material-ui/core';
import { useWindowSize } from 'react-use';
import zIndex from '@material-ui/core/styles/zIndex';

type Props = { sideBarProps: SidebarProps; mapProps: MapProps };

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    color: '#022851',
    position: 'relative',
    zIndex: 10
  },
  mainVis: {
    position: 'relative',
    zIndex: 0
  }
}));

const Index: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const window = useWindowSize();
  return (
    <Grid
      container
      item
      alignItems={'stretch'}
      className={classes.wrapper}
      style={{ height: window.height }}
    >
      <Sidebar {...props.sideBarProps} />
      <Map {...props.mapProps} />
    </Grid>
  );
};

export default Index;
