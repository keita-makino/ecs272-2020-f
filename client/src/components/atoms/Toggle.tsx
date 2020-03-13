import React from 'react';
import { Grid } from '@material-ui/core';

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { Slider as SliderMUI } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export type ControlProps = { type: string };

const Toggle: React.FC<ControlProps> = (props: ControlProps) => {
  const useStyles = makeStyles({
    root: {
      width: 300
    }
  });

  const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 20,
        fontStyle: 'normal'
      },
      body1: {
        fontWeight: 500
      },
      button: {
        fontStyle: 'italic'
      }
    }
  });

  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <ThemeProvider theme={theme}>
          <Typography variant="body1">Dark Mode</Typography>
        </ThemeProvider>
        <Grid item xs></Grid>
        <Grid item xs={2}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={checked} onChange={toggleChecked} />}
              label=""
            />
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default Toggle;
