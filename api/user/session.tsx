import router from 'umi/router';
import Router from '../../router';
import { message } from 'antd';
import i18n from '../../i18n';

const AuthUserToken = 'auth-user-token';

export let currentUser: LoginInfo | null = null;

export interface LoginInfo {
  token: string;
  namespacePath: string;
  email: string;
  name: string;
  publicEmail: string;
}

// 登录方法
//  将保存token并可以设置过期时间，默认不过期
export function login(info: LoginInfo) {
  localStorage.setItem(AuthUserToken, JSON.stringify(info));
  getUserInfo();
}

export function logout(callback?: () => void) {
  currentUser = null;
  localStorage.removeItem(AuthUserToken);
  if (callback === undefined) {
    callback = () => {
      message.success(i18n.t('user.tooltip.logout_success'));
      router.push(Router.Home.Login);
    };
  }
  callback!();
}

export function getUserInfo(): LoginInfo | null {
  const info = localStorage.getItem(AuthUserToken);
  if (info === null) {
    return null;
  }

  if (currentUser !== null) {
    return currentUser;
  }

  try {
    currentUser = JSON.parse(info) as LoginInfo;
    return currentUser;
  } catch (error) {
    console.warn("Can't parse json for login info.");
    return null;
  }
}
