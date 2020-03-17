import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const defaultTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        dark: '#523d00',
        main: '#FFBF00',
        light: '#FFDF80'
      },
      secondary: {
        dark: '#022851',
        main: '#6884A3',
        light: '#9AADC2'
      },
      text: {
        primary: '#022851',
        secondary: '#FFBF00'
      }
    }
  })
);

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        dark: '#523d00',
        main: '#FFBF00',
        light: '#FFDF80'
      },
      secondary: {
        dark: '#022851',
        main: '#6884A3',
        light: '#9AADC2'
      },
      text: {
        primary: '#FFF9E5',
        secondary: '#CDD6E0'
      }
    }
  })
);
