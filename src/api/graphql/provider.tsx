import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './client';

export default function GQLProvider(props: React.PropsWithChildren<any>) {
  return (
    <div>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </div>
  );
}
