import React, { useState } from 'react';
import GQLProvider from '../api/graphql/provider';
import {
  CodeOutlined,
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'umi/link';
import { withTranslation } from 'react-i18next';
import { GetUserInfo } from '../api/user/session';
import router from 'umi/router';
import { Message } from '../api/common/notice';
import Router from '../router';

const { Header, Sider, Content } = Layout;

function UserLayout(props: any) {
  const { t } = props;

  // 验证用户是否登录
  if (GetUserInfo() === null) {
    Message.Warning(t('user.tooltip.not_login'));
    router.push(Router.Home.Login);
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState(false);
  const plusMenu = (
    <Menu>
      <Menu.Item key="add-repo">
        <Link to="/user/repositories/new">{t('repository.new')}</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <GQLProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          style={{ background: '#fff' }}
        >
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <CodeOutlined />
                  <span>仓库</span>
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/user/repositories">仓库列表</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub_menu_user"
              title={
                <span>
                  <UserOutlined />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="2_1">修改密码</Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>设置</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {/*<LegacyIcon*/}
            {/*  style={{ paddingLeft: 20 }}*/}
            {/*  type={collapsed ? 'menu-unfold' : 'menu-fold'}*/}
            {/*  onClick={() => setCollapsed(!collapsed)}*/}
            {/*/>*/}
            <div className="header_quick" style={{ float: 'right', marginRight: '1vw' }}>
              <span>
                <SearchOutlined />
              </span>
              <span>
                <Dropdown overlay={plusMenu}>
                  <a className="ant-dropdown-link" href="#">
                    <PlusOutlined />
                  </a>
                </Dropdown>
              </span>
              <span>
                <Avatar size={'default'} icon={<UserOutlined />} />
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
