const AuthUserToken = 'auth-user-token';

// 登录方法
//  将保存token并可以设置过期时间，默认不过期
export function Login(token: string) {
  localStorage.setItem(AuthUserToken, token);
}

export function Logout() {
  localStorage.removeItem(AuthUserToken);
}

export function GetUserToken(): string | null {
  return localStorage.getItem(AuthUserToken);
}
