import React, { FC } from 'react';
import { Box } from '@material-ui/core'
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProviderProps } from "@apollo/react-common/lib/context/ApolloProvider"
import Rooms from './Components/Rooms';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export interface AppProps {
  apiProvider: Pick<ApolloProviderProps<NormalizedCacheObject>, "client">;
}

const App: FC<AppProps> = ({ apiProvider }) => {
  return (
    <ApolloProvider {...apiProvider}>
      <Box className="App">
        <Rooms />
      </Box>
    </ApolloProvider>
  );
}

export default App;
