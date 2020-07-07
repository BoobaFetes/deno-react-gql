import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
import App, { AppProps } from './App';

const appProps: AppProps = {
  apiProvider: {
    client: new ApolloClient<NormalizedCacheObject>({
      cache: new InMemoryCache({
        dataIdFromObject: object => {
          return `${object.constructor.name}:${object.id}`
        }
      })
    })
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App {...appProps} />
  </React.StrictMode>,
  document.getElementById('root')
);
