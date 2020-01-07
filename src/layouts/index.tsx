import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'umi/link';
import GQLProvider from '../api/graphql/provider';

const HeaderStyle = {
  marginTop: 20,
};

export default function IndexLayout(props: any) {
  return (
    <GQLProvider>
      <div style={HeaderStyle}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/register">注册</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/login">登录</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {props.children}
    </GQLProvider>
  );
}
