import { Router } from '../../config/router';
import i18n from '../../i18n/i18n';
import { NextRouter } from 'next/router'

const AuthUserToken = 'auth-user-token';

export interface LoginInfo {
  token: string;
  namespacePath: string;
  email: string;
  name: string;
  publicEmail: string;
}

export class SessionService {
  constructor() {
    return
  }

  /**
   * 用户是否登录
   * @returns {boolean}
   */
  static isLogin(): boolean {
    return !!SessionService.getUserInfo()
  }

  /**
   * 登录，将保存token并可以设置过期时间，默认不过期
   * @param info
   */
  static storeLogin(info: LoginInfo): LoginInfo | null {
    localStorage.setItem(AuthUserToken, JSON.stringify(info));
    return SessionService.getUserInfo();
  }

  /**
   * 退出登录
   * @param router
   * @param callback
   */
  static logout(router: NextRouter, callback?: () => void) {
    localStorage.removeItem(AuthUserToken);
    if (callback === undefined) {
      callback = () => {
        router.push(Router.Home.Login);
      };
    }
    callback?.();
  }

  /**
   * 获取用户信息
   */
  static getUserInfo(): LoginInfo | null {
    const info = localStorage.getItem(AuthUserToken);
    if (info === null) {
      return null;
    }

    try {
      return JSON.parse(info) as LoginInfo;
    } catch (error) {
      console.warn("Can't parse json for login info.");
      return null;
    }
  }
}

