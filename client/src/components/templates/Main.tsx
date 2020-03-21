import React from 'react';

import Map, { MapProps } from '../organisms/Map';
import Sidebar, { SidebarProps } from '../organisms/Sidebar';
import { makeStyles, Grid, Theme } from '@material-ui/core';
import { useWindowSize } from 'react-use';
import MiddlePanel from '../organisms/MiddlePanel';

type Props = { sideBarProps: SidebarProps; mapProps: MapProps };

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    color: theme.palette.text.primary,
    position: 'relative',
    zIndex: 10
  },
  mainVis: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0
  }
}));

const Main: React.FC<Props> = (props: Props) => {
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
      <Grid item container xs={4}>
        <Sidebar {...props.sideBarProps} />
      </Grid>
      <Grid item container xs={8} justify={'center'}>
        <MiddlePanel />
      </Grid>
      <Grid
        item
        container
        xs={12}
        justify={'center'}
        className={classes.mainVis}
      >
        <Map {...props.mapProps} />
      </Grid>
    </Grid>
  );
};

export default Main;
