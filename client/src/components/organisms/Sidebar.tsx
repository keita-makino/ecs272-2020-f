import React from 'react';
import ControlPanel, { ControlPanelProps } from '../molecules/ControlPanel';
import TypePanel from '../molecules/TypeLabelPanel';
import {
  makeStyles,
  Theme,
  Grid,
  Divider,
  IconButton
} from '@material-ui/core';
import TitlePanel from '../molecules/TitlePanel';
import { useSpring, motion, useTransform } from 'framer-motion';
import { useWindowSize } from 'react-use';
import { HelpOutline } from '@material-ui/icons';

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
    position: 'absolute'
  },
  glass: {
    height: '100%',
    width: '20rem',
    position: 'absolute',
    backdropFilter: 'blur(5px)'
  },
  contents: {
    height: '100%',
    width: '20rem',
    boxSizing: 'border-box',
    padding: '7rem 1.25rem',
    position: 'absolute'
  }
}));

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useStyles();
  const { height } = useWindowSize();

  const y = useSpring(-height, { stiffness: 50, mass: 0.4 });
  const o = useTransform(y, [-height, 0], [0, 0.2]);

  return (
    <>
      <Grid item className={`${classes.titlePanel}`}>
        <TitlePanel y={y} />
      </Grid>
      <motion.div style={{ y }} className={`${classes.expansion}`}>
        <Grid container item>
          <Grid item className={`${classes.glass}`}></Grid>
          <motion.div style={{ opacity: o }}>
            <Grid item className={`${classes.background}`}></Grid>
          </motion.div>
          <Grid item className={`${classes.contents}`}>
            <Divider style={{ margin: '0.6rem 0 2rem 0' }} />
            <TypePanel />
            <ControlPanel
              title={props.controlPanel.title}
              sliderArray={props.controlPanel.sliderArray}
              toggleArray={props.controlPanel.toggleArray}
            />
            <Grid
              item
              xs={12}
              style={{
                color: 'inherit',
                position: 'absolute',
                bottom: '2rem',
                right: '1rem'
              }}
            >
              <a
                href={'https://github.com/keita-makino/ecs272-2020-f'}
                target={'blank'}
              >
                <IconButton>
                  <HelpOutline style={{ color: '#999999' }} />
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
};

export default Sidebar;
