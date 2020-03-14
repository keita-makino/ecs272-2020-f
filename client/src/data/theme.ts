import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const defaultTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
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
        secondary: '#FFF9E5'
      }
    }
  })
);

export default defaultTheme;
