import React, { useState } from 'react';
import GQLProvider from '../api/graphql/provider';
import {
  CodeOutlined,
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'umi/link';
import { withTranslation } from 'react-i18next';
import { getUserInfo, logout } from '../api/user/session';
import router from 'umi/router';
import { Message } from '../api/common/notice';
import Router from '../router';

const { Header, Sider, Content } = Layout;

function UserLayout(props: any) {
  const { t } = props;

  // 验证用户是否登录
  if (getUserInfo() === null) {
    Message.Warning(t('user.tooltip.not_login'));
    router.push(Router.Home.Login);
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState(false);
  const plusMenu = (
    <Menu>
      <Menu.Item key="repo-add">
        <Link to={Router.User.Repository.New}>{t('repository.new')}</Link>
      </Menu.Item>
    </Menu>
  );
  const userMenu = (
    <Menu>
      <Menu.Item key="sub_menu_user">
        <span>
          <UserOutlined />
          <span>用户管理</span>
        </span>
      </Menu.Item>
      <Menu.Divider></Menu.Divider>
      <Menu.Item key="user-logout">
        <Link
          to="#"
          // type="link"
          onClick={() => {
            logout();
          }}
        >
          {t('user.logout')}
        </Link>
      </Menu.Item>
    </Menu>
  );

  let path = window.location.pathname.split('/').slice(0, 3);
  let menuKey = [path.join('/')];

  return (
    <GQLProvider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/*<LegacyIcon*/}
          {/*  style={{ paddingLeft: 20 }}*/}
          {/*  type={collapsed ? 'menu-unfold' : 'menu-fold'}*/}
          {/*  onClick={() => setCollapsed(!collapsed)}*/}
          {/*/>*/}
          <span
            style={{
              padding: 10,
              margin: 20,
              background: '#333333',
              color: '#ffffff',
            }}
          >
            GrowerLab
          </span>

          <div className="header_quick" style={{ float: 'right', marginRight: '1vw' }}>
            <span>
              <SearchOutlined />
            </span>
            <span>
              <Dropdown overlay={plusMenu} arrow>
                <Link to="#">
                  <PlusOutlined />
                </Link>
              </Dropdown>
            </span>
            <span>
              <Dropdown overlay={userMenu} arrow>
                <Avatar size={'small'} icon={<UserOutlined />} />
              </Dropdown>
            </span>
          </div>
        </Header>
      </Layout>

      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          style={{
            background: 'rgb(244, 245, 247)',
            bottom: 0,
            left: 0,
            position: 'fixed',
            top: 56,
            zIndex: 200,
            paddingTop: 30,
          }}
        >
          <Menu
            className="userPrimeryMenu"
            mode="inline"
            selectedKeys={menuKey}
            defaultOpenKeys={menuKey}
          >
            <Menu.Item key={Router.User.Index}>
              <HomeOutlined />
              <Link to={Router.User.Index}>Dashboard</Link>
            </Menu.Item>
            <SubMenu
              key={Router.User.Repository.List}
              title={
                <span>
                  <CodeOutlined />
                  <span>仓库</span>
                </span>
              }
            >
              <Menu.Item key={Router.User.Repository.List}>
                <Link to={Router.User.Repository.List}>仓库列表</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3">
              <UploadOutlined />
              <span>设置</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              background: '#fff',
              minHeight: 280,
              marginLeft: 200,
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
