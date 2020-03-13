import React from 'react';
import { Grid } from '@material-ui/core';

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { Slider as SliderMUI } from '@material-ui/core';

export type ControlProps = { type: string };

const Slider: React.FC<ControlProps> = (props: ControlProps) => {
  const PrettoSlider = withStyles({
    root: {
      color: '#fbc50a',
      height: 3,
      padding: '13px 0'
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
      boxShadow: '#ebebeb 0px 2px 2px',
      '&:focus,&:hover,&$active': {
        boxShadow: '#ccc 0px 2px 3px 1px'
      },
      '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1
      }
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)'
    },
    track: {
      height: 3
    },
    rail: {
      color: '#d8d8d8',
      opacity: 1,
      height: 3
    }
  })(SliderMUI);

  const theme = createMuiTheme({
    spacing: factor => [0, 4, 8, 16, 32, 64][factor],
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

  const [value, setValue] = React.useState<number>(30);
  const [value1, setValue1] = React.useState<number>(30);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  const handleChange1 = (event: any, newValue: number | number[]) => {
    setValue1(newValue as number);
  };

  const [checked, setChecked] = React.useState(false);
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  return (
    <Grid container spacing={0}>
      <ThemeProvider theme={theme}>
        <Typography variant="body1">{props.type}</Typography>
        <Grid item xs></Grid>
      </ThemeProvider>
      <Grid item xs={5}>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
        />
      </Grid>
    </Grid>
  );
};

export default Slider;
