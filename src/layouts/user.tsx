import React, { useState } from 'react';
import GQLProvider from '../api/graphql/provider';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'umi/link';
import { withTranslation } from 'react-i18next';
import { GetUserInfo } from '../api/user/session';
import router from 'umi/router';
import { Message } from '../api/common/notice';

const { Header, Sider, Content } = Layout;

function UserLayout(props: any) {
  const { t } = props;

  // 验证用户是否登录
  if (GetUserInfo() === null) {
    Message.Warning(t('user.tooltip.not_login'));
    router.push('/login');
    return null;
  }

  const [collapsed, setCollapsed] = useState(false);
  const plusMenu = (
    <Menu>
      <Menu.Item key="add-repo">
        <Link to="/user/repositorys/new">{t('repository.new')}</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <GQLProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              padding: 10,
              margin: 20,
              background: '#333333',
              color: '#ffffff',
            }}
          >
            GrowerLab
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="code" />
                  <span>仓库</span>
                </span>
              }
            >
              <Menu.Item key="1">仓库列表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub_menu_user"
              title={
                <span>
                  <Icon type="user" />
                  用户管理
                </span>
              }
            >
              <Menu.Item key="2_1">修改密码</Menu.Item>
            </SubMenu>
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
            <div className="header_quick" style={{ float: 'right', marginRight: '1vw' }}>
              <span>
                <Icon type="search" />
              </span>
              <span>
                <Dropdown overlay={plusMenu}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="plus" />
                    <Icon type="down" />
                  </a>
                </Dropdown>
              </span>
              <span>
                <Avatar size={30} icon="user" />
              </span>
            </div>
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

export default withTranslation()(UserLayout);
