import React, { ReactChildren } from 'react';
import ControlPanel, { ControlPanelProps } from '../molecules/ControlPanel';
import TypePanel, { TypePanelProps } from '../molecules/TypeLabelPanel';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import TitlePanel from '../molecules/TitlePanel';
import { useSpring, motion, useMotionValue, useTransform } from 'framer-motion';

export type SidebarProps = {
  controlPanel: ControlPanelProps;
};

const useStyles = makeStyles((theme: Theme) => ({
  titlePanel: {
    width: '15rem',
    position: 'absolute',
    top: '2rem',
    left: '2.5rem',
    zIndex: 8
  },
  expansion: {
    height: '100%',
    width: '20rem',
    position: 'fixed',
    zIndex: 7
  },
  background: {
    height: '100%',
    width: '20rem',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    backdropFilter: 'blur(5px)'
  },
  contents: {
    height: '100%',
    width: '20rem',
    boxSizing: 'border-box',
    padding: '10rem 1.25rem',
    position: 'absolute'
  }
}));

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useStyles();

  const y = useSpring(-720, { stiffness: 50, mass: 0.4 });
  const o = useTransform(y, [-720, 0], [0, 0.2]);

  return (
    <>
      <Grid item className={`${classes.titlePanel}`}>
        <TitlePanel y={y} />
      </Grid>
      <motion.div style={{ y }} className={`${classes.expansion}`}>
        <Grid container item>
          <motion.div style={{ opacity: o }}>
            <Grid item className={`${classes.background}`}></Grid>
          </motion.div>
          <Grid item className={`${classes.contents}`}>
            <TypePanel />
            <ControlPanel
              title={props.controlPanel.title}
              sliderArray={props.controlPanel.sliderArray}
              toggleArray={props.controlPanel.toggleArray}
            />
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
};

export default Sidebar;
