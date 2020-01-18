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

export function Logout() {
  currentUser = null;
  localStorage.removeItem(AuthUserToken);
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
