import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import IndexTemplate from '../components/templates/Index';
import initialStateIndex from '../data/initialState';
import useBusy from '../uses/useBusy';
import { MuiThemeProvider } from '@material-ui/core';
import { defaultTheme, darkTheme } from '../data/theme';
import { useCurrentUser } from '../uses/useUser';

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  const user = useCurrentUser();
  return (
    <MuiThemeProvider theme={user?.setting.darkMode ? darkTheme : defaultTheme}>
      <IndexTemplate
        sideBarProps={initialStateIndex.sideBar}
        mapProps={initialStateIndex.map}
      />
    </MuiThemeProvider>
  );
};

export default Index;
