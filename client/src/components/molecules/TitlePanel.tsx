import React, { useState } from 'react';
import { Typography, Grid, IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import { MotionValue, useTransform, motion } from 'framer-motion';
import { useWindowSize } from 'react-use';

export type TitleProps = { y: MotionValue };

const TitlePanel: React.FC<TitleProps> = (props: TitleProps) => {
  const [state, setState] = useState(false);
  const onClick = () => {
    props.y.set(state ? -720 : 0);
    setState(!state);
  };
  const height = useWindowSize().height;

  const r = useTransform(props.y, [-720, 0], [0, 180]);
  const y = useTransform(props.y, [-720, 0], [0, height - 192]);

  return (
    <Grid xs={12} item container>
      <Grid item xs={12}>
        <Typography variant={'h5'} align={'right'}>
          A Bubble City of Davis
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'subtitle1'} align={'right'}>
          Explorer
        </Typography>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <motion.div style={{ rotate: r, y }}>
          <Grid item xs={12} justify={'center'}>
            <IconButton
              onClick={onClick}
              style={{ color: 'inherit', margin: '-2.4rem 0 0 0' }}
            >
              <KeyboardArrowDown style={{ fontSize: 72 }} />
            </IconButton>
          </Grid>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default TitlePanel;
