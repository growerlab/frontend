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
export function Login(info: LoginInfo) {
  localStorage.setItem(AuthUserToken, JSON.stringify(info));
  GetUserInfo();
}

export function Logout(callback?: () => void) {
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

export function GetUserInfo(): LoginInfo | null {
  var info = localStorage.getItem(AuthUserToken);
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
    return null;
  }
}
