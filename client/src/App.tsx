import React from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Index from './pages/Index';
import { hot } from 'react-hot-loader';

const cache = new InMemoryCache({
  freezeResults: true
});
const link = new HttpLink({
  uri: 'https://ecs272-2020-f.herokuapp.com/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  resolvers: {},
  link
});

cache.writeData({
  data: {
    session: {
      userId: '',
      roomId: '',
      editMode: false,
      modifying: false,
      computing: false,
      isLoading: true,
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
