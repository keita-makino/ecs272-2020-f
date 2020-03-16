import React from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Index from './pages/Index';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core';
import defaultTheme from './data/theme';

const cache = new InMemoryCache({
  freezeResults: true
});
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

cache.writeData({
  data: {
    session: {
      userId: 1,
      roomId: 1,
      editMode: false,
      modifying: false,
      computing: false,
      loaded: false,
      __typename: 'session'
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <ApolloProvider client={client}>
        <Index />
      </ApolloProvider>
    </MuiThemeProvider>
  );
};

export default hot(module)(App);
