import React from 'react';
import IndexHeader from './IndexHeader';
import GQLProvider from '../api/graphql/provider';

const BasicLayout: React.FC = props => {
  return (
    <GQLProvider>
      <IndexHeader />
      {props.children}
    </GQLProvider>
  );
};

export default BasicLayout;
