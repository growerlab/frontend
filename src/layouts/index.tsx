import React from 'react';
import IndexHeader from './IndexHeader';

const BasicLayout: React.FC = props => {
  return (
    <div>
      <IndexHeader />
      {props.children}
    </div>
  );
};

export default BasicLayout;
