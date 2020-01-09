import React, { useState } from 'react';
import GQLProvider from '../api/graphql/provider';
import { Layout, Menu, Icon } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Sider, Content } = Layout;

// TODO 应验证用户是否登录
// TODO 未登录用应该重定向到登录页面

export default function UserLayout(props: any) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GQLProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ padding: 20, margin: 20, background: '#eeeeee' }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="code" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="1">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>设置</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              style={{ paddingLeft: 20 }}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </GQLProvider>
  );
}
