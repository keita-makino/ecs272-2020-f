import React from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Index from './pages/Index';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core';

const cache = new InMemoryCache({
  freezeResults: true
});
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  resolvers: {},
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
    <ApolloProvider client={client}>
      <Index />
    </ApolloProvider>
  );
};

export default hot(module)(App);
