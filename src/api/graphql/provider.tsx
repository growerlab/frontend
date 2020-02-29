import React from 'react';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks';

export default function GQLProvider(props: React.PropsWithChildren<any>) {
  return (
    <div>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </div>
  );
}
