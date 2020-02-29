import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'umi/link';

export function BaseHeader(props: any) {
  const { Header } = Layout;
  const logoStyle = {
    width: '120px',
    height: '31px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '16px 24px 16px 0',
    float: 'left',
  };

  return (
    <div>
      <Header>
        <div style={logoStyle} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/register">注册</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/login">登录</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </div>
  );
}
