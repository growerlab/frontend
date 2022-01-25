import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { withTranslation } from 'react-i18next';

import { SessionService } from '../../services/auth/session';
import { Message } from '../../api/common/notice';
import { Router } from '../../config/router';

// const {Header, Sider, Content} = Layout;

function UserLayout(props: any) {
  const { t } = props;
  const router = useRouter()

  useEffect((): void => {
    // 验证用户是否登录
    if (SessionService.isLogin()) {
      Message.Warning(t('user.tooltip.not_login'));
      router.push(Router.Home.Login);
    }
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState(false);
  const plusMenu = (
    <Link href={Router.User.Repository.New}>{t('repository.new')}</Link>
  );

  const userMenu = (
    <div>
      <span>用户管理</span>
      <Link href="#" onClick={(event: React.MouseEvent<HTMLElement>) => {
        return SessionService.logout(router);
      }}
      >
        {t('user.logout')}
      </Link>
    </div >

  );

  // const path = window.location.pathname.split('/').slice(0, 3);
  // const menuKey = [path.join('/')];

  return (
    <div>
      <div style={{ background: '#fff', padding: 0 }}>
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

      </div>

      <Link href={Router.User.Index}>Dashboard</Link>

      <span>仓库</span>
      <Link href={Router.User.Repository.List}>仓库列表</Link>

      <span>设置</span>

      <div>
        {props.children}
      </div>
    </div>
  );
}

export default withTranslation()(UserLayout);
