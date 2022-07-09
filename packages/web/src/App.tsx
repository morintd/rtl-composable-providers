import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';

import Counter from './Counter';
import { store } from './store/store';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',

  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Counter />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
