import IndexHeader from './IndexHeader';
import React from 'react';

const BasicLayout: React.FC = props => {
  return (
    <div>
      <IndexHeader />
      {props.children}
    </div>
  );
};

export default BasicLayout;
