import React from 'react';
import { Grid, CircularProgress, Box, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';

export type LoadingScreenProps = {};

const LoadingScreen: React.FC<LoadingScreenProps> = (
  props: LoadingScreenProps
) => {
  return (
    <Grid
      container
      xs={12}
      justify={'center'}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        zIndex: 1000
      }}
    >
      <Grid container item xs={12} alignContent={'center'}>
        <Grid container item xs={12} justify={'center'}>
          <CircularProgress size={100} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify={'center'}
          style={{ paddingTop: '2rem' }}
        >
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 2, easing: 'easeOut' }}
          >
            <Typography align={'center'} variant={'body1'}>
              Loading the geometry...
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoadingScreen;
